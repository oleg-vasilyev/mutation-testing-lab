import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { of } from 'rxjs';

import { ActionsComponent } from './actions.component';

import { DATA_SERVICE_PROVIDER, DATA_SERVICE_STUB } from '../data-service/testing';
import { FilterEnum } from '../models';


describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [DATA_SERVICE_PROVIDER()],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('selectHandler()', () => {

    it('should fire applyFilter() on dataService', () => {
      const filter = FilterEnum.Active;

      component.selectHandler(filter);

      expect(DATA_SERVICE_STUB().applyFilterSpy).toHaveBeenCalledWith(filter);
    });
  });

  describe('isSelected()', () => {

    it('should return true if filter is matched', fakeAsync(() => {
      const filter = FilterEnum.Active;
      DATA_SERVICE_STUB().selectedFilter$Spy.and.returnValue(of(filter));
      fixture = TestBed.createComponent(ActionsComponent);
      component = fixture.componentInstance;
      tick();

      expect(component.isSelected(filter)).toBeTrue();
    }));

    it('should return false if filter is NOT matched', fakeAsync(() => {
      DATA_SERVICE_STUB().selectedFilter$Spy.and.returnValue(of(FilterEnum.Active));
      fixture = TestBed.createComponent(ActionsComponent);
      component = fixture.componentInstance;
      tick();

      expect(component.isSelected(FilterEnum.All)).toBeFalse();
    }));
  });

  describe('clearCompletedHandler()', () => {

    it('should fire clearCompleted() on dataService', () => {
      component.clearCompletedHandler();

      expect(DATA_SERVICE_STUB().clearCompletedSpy).toHaveBeenCalledWith();
    });
  });
});
