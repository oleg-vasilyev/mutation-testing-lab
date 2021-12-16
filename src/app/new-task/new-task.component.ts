import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DataService } from '../data-service/data.service';

import { FormBuilder, FormControl, FormGroup } from '@ng-stack/forms';

import { ITask } from '../models';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {

  private _formGroup!: FormGroup<ITask>;
  public get formGroup(): FormGroup<ITask> {
    return this._formGroup;
  }

  public get isDoneControl(): FormControl<ITask['isDone']> {
    return this._formGroup.get('isDone') as FormControl<ITask['isDone']>;
  }

  public get titleControl(): FormControl<ITask['title']> {
    return this._formGroup.get('title') as FormControl<ITask['title']>;
  }

  private readonly INIT_STATE = {
    isDone: false,
    title: '',
  } as ITask;

  public constructor(
    private _formBuilder: FormBuilder,
    private _dataService: DataService,
  ) {

    this._formGroup = this._formBuilder.group<ITask>(this.INIT_STATE);
  }

  public enterHandler(): void {
    this._dataService.create(this._formGroup.value);
    this._formGroup.reset(this.INIT_STATE);
  }

  public escHandler(): void {
    this._formGroup.reset(this.INIT_STATE);
  }
}
