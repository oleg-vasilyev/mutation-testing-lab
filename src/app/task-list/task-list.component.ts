import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { DataService } from '../data-service/data.service';

import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { Task } from '../models';
import { ENTER_ANIMATION } from '../animations';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ENTER_ANIMATION],
})
export class TaskListComponent extends OnDestroyMixin {

  private _tasks!: Array<Task>;
  public get tasks(): Array<Task> {
    return this._tasks;
  }

  public constructor(
    private _dataService: DataService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();

    this._dataService.tasks$
      .pipe(untilComponentDestroyed(this))
      .subscribe(tasks => {
        this._tasks = tasks;
        this._changeDetectorRef.markForCheck();
      });
  }

  public dropHandler(event: CdkDragDrop<Array<string>>): void {
    moveItemInArray(this._tasks, event.previousIndex, event.currentIndex);

    this._dataService.reorder(this._tasks);
  }

  public removeHandler(task: Task): void {
    this._dataService.remove(task);
  }

  public checkboxChangeHandler(task: Task): void {
    this._dataService.toggle(task);
  }

  public trackByFunc(_: number, item: Task): string {
    return item.id;
  }
}
