import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '../data-service/data.service';

import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { FilterEnum } from '../models/filter';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent extends OnDestroyMixin {

  public FilterEnum = FilterEnum;

  public get tasksLeft$(): Observable<number> {
    return this._dataService.tasksLeft$;
  }

  private _selectedFilter!: FilterEnum;

  public constructor(private _dataService: DataService) {
    super();

    this._dataService.applyFilter(FilterEnum.All);

    this._dataService.selectedFilter$
      .pipe(untilComponentDestroyed(this))
      .subscribe(filter => {
        this._selectedFilter = filter;
      });
  }

  public selectHandler(filterEnum: FilterEnum): void {
    this._dataService.applyFilter(filterEnum);
  }

  public isSelected(filterEnum: FilterEnum): boolean {
    return this._selectedFilter === filterEnum;
  }

  public clearCompletedHandler(): void {
    this._dataService.clearCompleted();
  }
}
