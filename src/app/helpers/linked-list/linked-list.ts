/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface INodeItem {
  id: string;
  hash: string;
}

export interface IStoredNode<T extends INodeItem> {
  hash: string;
  value: T;
}

class StoredNode<T extends INodeItem> {

  private static readonly HEAD_MARK = 'HEAD';
  private static readonly DIVIDER_MARK = '|';

  public get isHead(): boolean {
    return this._previousItemHash === null;
  }

  public get item(): T {
    return this._value;
  }

  private _itemHash!: string;
  public get itemHash(): string {
    return this._itemHash;
  }

  private _previousItemHash!: string | null;
  public get previousItemHash(): string | null {
    return this._previousItemHash;
  }

  public constructor(
    private _value: T,
    nodeHash: string,
  ) {
    this.splitHash(nodeHash);
  }

  public static createHash(itemHash: string, previousItemHash: string | null): string {
    return `${itemHash}${StoredNode.DIVIDER_MARK}${previousItemHash ?? StoredNode.HEAD_MARK}`;
  }

  private splitHash(nodeHash: string): void {
    [this._itemHash, this._previousItemHash] = nodeHash.split(StoredNode.DIVIDER_MARK);

    if (this._previousItemHash === StoredNode.HEAD_MARK) {
      this._previousItemHash = null;
    }
  }
}

class Node<T extends INodeItem> {

  public get isHead(): boolean {
    return this._previous === null;
  }

  public get previous(): Node<T> | null {
    return this._previous;
  }

  public get item(): T {
    return this._item;
  }

  public set item(updated: T) {
    this._item = updated;
  }

  public constructor(private _item: T, private _previous: Node<T> | null) { }

  public static parse<T extends INodeItem>(data: Array<IStoredNode<T>>): Node<T> | null {
    const storedNodes = data.map(d => new StoredNode(d.value, d.hash));
    const head = storedNodes.find(d => d.isHead);

    if (!head) {
      return null;
    }

    let node: Node<T> | null = new Node<T>(head!.item, null);
    let previous: StoredNode<T> | null = storedNodes.find(d => d.previousItemHash === node!.item.hash) ?? null;

    while (previous) {
      node = new Node<T>(previous!.item, node);
      previous = storedNodes.find(d => d.previousItemHash === node!.item.hash) ?? null;
    }

    return node;
  }

  public deparse(): Array<IStoredNode<T>> {
    const flatten = [];
    for (let current: Node<T> | null = this; current; current = current!.previous) {
      flatten.push(current);
    }

    return flatten.reverse()
      .reduce((store, node) =>
        store.concat([{ hash: node.getHash(), value: node.item }]),
        [] as Array<IStoredNode<T>>);
  }

  public getHash(): string {
    return StoredNode.createHash(this._item.hash, this.previous?.item.hash ?? null);
  }

  public updatePrevious(previous: Node<T> | null): void {
    this._previous = previous;
  }

  public getHead(): Node<T> {
    return this.isHead
      ? this
      : this._previous!.getHead();
  }

  public find(item: T): Node<T> | null {
    return this.item.id === item.id
      ? this
      : this.previous?.find(item) ?? null;
  }

  public findNext(item: T): Node<T> | null {
    return this._previous?.item.id === item.id
      ? this
      : this._previous?.findNext(item) ?? null;
  }
}

export class LinkedList<T extends INodeItem> {

  public constructor(private _node: Node<T> | null = null) { }

  public static parse<T extends INodeItem>(data: Array<IStoredNode<T>>): LinkedList<T> {
    return new LinkedList<T>(Node.parse(data));
  }

  public deparse(): Array<IStoredNode<T>> {
    return this._node
      ? this._node.deparse()
      : [];
  }

  public getFlatten(): Array<T> {
    const output = [];
    for (let current: Node<T> | null = this._node; current; current = current!.previous) {
      output.push(current!.item);
    }

    return output.reverse();
  }

  public add(item: T): LinkedList<T> {
    const head = new Node<T>(item, null);

    if (!this._node) {
      this._node = head;
    } else {
      this._node
        .getHead()
        .updatePrevious(head);
    }

    return this;
  }

  public remove(item: T): LinkedList<T> {
    const next = this._node?.findNext(item);
    const previous = this._node?.find(item)?.previous ?? null;

    if (next) {
      next.updatePrevious(previous);
    } else {
      this._node = previous;
    }

    return this;
  }

  public update(item: T): LinkedList<T> {
    this._node!.find(item)!.item = item;

    return this;
  }

  public reorder(items: Array<T>): LinkedList<T> {
    const [first, ...rest] = items;

    this._node = rest.reduce(
      (node, next) => new Node<T>(next, node),
      new Node<T>(first, null),
    );

    return this;
  }
}
