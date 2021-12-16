import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TaskListComponent } from './task-list.component';

import { DATA_SERVICE_PROVIDER, DATA_SERVICE_STUB } from '../data-service/testing';
import { Task } from '../models';


describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatIconModule,
        DragDropModule,
      ],
      declarations: [TaskListComponent],
      providers: [DATA_SERVICE_PROVIDER()],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('dropHandler()', () => {

    it('should fire reorder on dataService', () => {
      const [task1, task2] = [new Task('1', false, 'task1'), new Task('2', false, 'task2')];
      component['_tasks'] = [task1, task2];

      component.dropHandler({ previousIndex: 0, currentIndex: 1 } as unknown as CdkDragDrop<Array<string>>);

      expect(DATA_SERVICE_STUB().reorderSpy).toHaveBeenCalledWith([task2, task1]);
    });
  });

  describe('removeHandler()', () => {

    it('should fire remove on dataService', () => {
      const task = new Task('1', false, 'task1');

      component.removeHandler(task);

      expect(DATA_SERVICE_STUB().removeSpy).toHaveBeenCalledWith(task);
    });
  });

  describe('checkboxChangeHandler()', () => {

    it('should fire toggle on dataService', () => {
      const task = new Task('1', false, 'task1');

      component.checkboxChangeHandler(task);

      expect(DATA_SERVICE_STUB().toggleSpy).toHaveBeenCalledWith(task);
    });
  });

  describe('trackByFunc()', () => {

    it('should return task id', () => {
      const task = new Task('1', false, 'task1');

      // eslint-disable-next-line no-magic-numbers
      expect(component.trackByFunc(0, task)).toBe(task.id);
    });
  });
});
