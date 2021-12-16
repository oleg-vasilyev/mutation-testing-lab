import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { DataService } from '../data.service';

import { FilterEnum, ITask, Task } from '../../models';


@Injectable()
export class DataServiceStub {

  public tasks$Spy = jasmine.createSpy('tasks$');
  public tasksLeft$Spy = jasmine.createSpy('tasksLeft$');
  public selectedFilter$Spy = jasmine.createSpy('selectedFilter$');
  public createSpy = jasmine.createSpy('create');
  public removeSpy = jasmine.createSpy('remove');
  public toggleSpy = jasmine.createSpy('toggle');
  public reorderSpy = jasmine.createSpy('reorder');
  public clearCompletedSpy = jasmine.createSpy('clearCompleted');
  public applyFilterSpy = jasmine.createSpy('applyFilter');

  public get tasks$(): Observable<Array<Task>> {
    return this.tasks$Spy();
  }

  public get tasksLeft$(): Observable<number> {
    return this.tasksLeft$Spy();
  }

  public get selectedFilter$(): Observable<FilterEnum> {
    return this.selectedFilter$Spy();
  }

  public constructor() {
    this.tasks$Spy.and.returnValue(of([]));
    // eslint-disable-next-line no-magic-numbers
    this.tasksLeft$Spy.and.returnValue(of(0));
    this.selectedFilter$Spy.and.returnValue(of(FilterEnum.All));
  }

  public create(data: ITask): void {
    this.createSpy(data);
  }

  public remove(task: Task): void {
    this.removeSpy(task);
  }

  public toggle(task: Task): void {
    this.toggleSpy(task);
  }

  public reorder(tasks: Array<Task>): void {
    this.reorderSpy(tasks);
  }

  public clearCompleted(): void {
    this.clearCompletedSpy();
  }

  public applyFilter(filter: FilterEnum): void {
    this.applyFilterSpy(filter);
  }
}

export const DATA_SERVICE_PROVIDER = (): {
  provide: typeof DataService;
  useValue: DataServiceStub;
} => ({
  provide: DataService,
  useValue: new DataServiceStub(),
});

export const DATA_SERVICE_STUB = (): DataServiceStub => TestBed.inject(DataService) as unknown as DataServiceStub;
