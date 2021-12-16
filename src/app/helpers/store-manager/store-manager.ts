import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '../../models';
import { IStoredNode, LinkedList } from '../linked-list';


export class StoreManager {

  public get tasks(): Array<Task> {
    return this._tasks$.value;
  }

  private _tasks$: BehaviorSubject<Array<Task>>;
  public get tasks$(): Observable<Array<Task>> {
    return this._tasks$;
  }

  private _linkedList: LinkedList<Task>;

  public constructor(private _localStorage: Storage) {
    this._linkedList = LinkedList.parse(
      Object.keys(this._localStorage)
        .map(key => ({
          hash: key,
          value: Task.parse(this._localStorage[key]),
        })),
    );

    this._tasks$ = new BehaviorSubject<Array<Task>>(this._linkedList.getFlatten());
  }

  public add(task: Task): void {
    this.applyChanges(
      this._linkedList,
      () => this._linkedList.add(task),
    );
  }

  public remove(data: Task | Array<Task>): void {
    this.applyChanges(
      this._linkedList,
      () => (Array.isArray(data)
        ? data
        : [data]
      ).reduce(
        (_, item) => this._linkedList.remove(item),
        this._linkedList,
      ),
    );
  }

  public update(task: Task): void {
    this.applyChanges(
      this._linkedList,
      () => this._linkedList.update(task),
    );
  }

  public reorder(tasks: Array<Task>): void {
    this.applyChanges(
      this._linkedList,
      () => this._linkedList.reorder(tasks),
    );
  }

  private sync(oldData: Array<IStoredNode<Task>>, newData: Array<IStoredNode<Task>>): void {
    const deltaToAdd = newData.filter(newItem => !oldData.some(oldItem => oldItem.hash === newItem.hash));
    const deltaToRemove = oldData.filter(oldItem => !newData.some(newItem => newItem.hash === oldItem.hash));

    deltaToAdd.forEach(d => {
      this._localStorage.setItem(d.hash, d.value.deparse());
    });
    deltaToRemove.forEach(d => {
      this._localStorage.removeItem(d.hash);
    });
  }

  private applyChanges(linkedListBeforeChange: LinkedList<Task>, changeFunction: () => LinkedList<Task>): void {
    const storedNodes = linkedListBeforeChange.deparse();
    const updatedList = changeFunction();

    this.sync(storedNodes, updatedList.deparse());

    this._tasks$.next(updatedList.getFlatten());
  }
}
