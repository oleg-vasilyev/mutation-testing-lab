import { GET_HASH } from '../helpers';


export interface ITask {
  isDone: boolean;
  title: string;
}

interface IStoredTask extends ITask {
  id: string;
}

export class Task {

  public get title(): string {
    return this._title;
  }

  public get isDone(): boolean {
    return this._isDone;
  }

  public get id(): string {
    return this._id;
  }

  private _hash: string;
  public get hash(): string {
    return this._hash;
  }

  public constructor(
    private _id: string,
    private _isDone: boolean,
    private _title: string,
  ) {
    this._hash = GET_HASH(`${_id}${_isDone}${_title}`);
  }

  public static parse(task: string): Task {
    const { id, isDone, title } = JSON.parse(task) as IStoredTask;

    return new Task(id, isDone, title);
  }

  public toggle(): Task {
    return new Task(this.id, !this.isDone, this.title);
  }

  public deparse(): string {
    const { id, isDone, title } = this;
    return JSON.stringify({ id, isDone, title });
  }
}
