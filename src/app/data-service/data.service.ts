import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WindowService } from '../window-service/window.service';

import { GET_GUID, StoreManager } from '../helpers';
import { FilterEnum, ITask, Task } from '../models';


@Injectable()
export class DataService {

  private _tasks$: Observable<Array<Task>>;
  public get tasks$(): Observable<Array<Task>> {
    return this._tasks$;
  }

  private _tasksLeft$: Observable<number>;
  public get tasksLeft$(): Observable<number> {
    return this._tasksLeft$;
  }

  private _selectedFilter$: BehaviorSubject<FilterEnum>;
  public get selectedFilter$(): Observable<FilterEnum> {
    return this._selectedFilter$;
  }

  private _storeManager: StoreManager;

  public constructor(windowService: WindowService) {
    this._storeManager = new StoreManager(windowService.getWindow().localStorage);

    this._selectedFilter$ = new BehaviorSubject<FilterEnum>(FilterEnum.All);

    this._tasks$ = combineLatest([this._storeManager.tasks$, this._selectedFilter$])
      .pipe(map((([tasks, filter]) => {

        switch (filter) {
          case FilterEnum.All:
            return tasks;
          case FilterEnum.Active:
            return tasks.filter(d => !d.isDone);
          case FilterEnum.Completed:
            return tasks.filter(d => d.isDone);
          default:
            return tasks;
        }
      })));

    this._tasksLeft$ = this._storeManager.tasks$.pipe(map(tasks => tasks.filter(d => !d.isDone).length));
  }

  public create({ isDone, title }: ITask): void {
    this._storeManager.add(new Task(GET_GUID(), isDone, title));
  }

  public remove(task: Task): void {
    this._storeManager.remove(task);
  }

  public toggle(task: Task): void {
    this._storeManager.update(task.toggle());
  }

  public reorder(tasks: Array<Task>): void {
    this._storeManager.reorder(tasks);
  }

  public clearCompleted(): void {
    this._storeManager.remove(this._storeManager.tasks.filter(d => d.isDone));
  }

  public applyFilter(filter: FilterEnum): void {
    this._selectedFilter$.next(filter);
  }
}
