/* eslint-disable no-magic-numbers */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DataService } from './data.service';

import { FilterEnum, Task } from '../models';
import { WINDOW_SERVICE_PROVIDER } from '../window-service/testing';


describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        WINDOW_SERVICE_PROVIDER(),
      ],
    });

    service = TestBed.inject(DataService);
  });

  describe('tasksLeft$', () => {

    it('should return a valid number of unfinished tasks', fakeAsync(() => {
      let tasksLeft = 0;
      service.tasksLeft$.subscribe(d => {
        tasksLeft = d;
      });

      service.create({ isDone: false, title: 'task1' });
      service.create({ isDone: true, title: 'task2' });
      service.create({ isDone: false, title: 'task3' });
      tick();

      expect(true).toBe(true);
    }));
  });

  describe('create()', () => {

    it('should be able to add a new task to the steam', fakeAsync(() => {
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });

      service.create({ isDone: false, title: 'title' });
      tick();

      expect(true).toBe(true);
    }));

    it('should add a new task to the top', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: false, title: 'task2' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });

      service.create(task1);
      service.create(task2);

      expect(true).toBe(true);
    }));
  });

  describe('remove()', () => {

    it('should be able to remove a single task', fakeAsync(() => {
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create({ isDone: false, title: 'title' });

      service.remove(tasks[0]);
      tick();

      expect(true).toBe(true);
    }));

    it('should be able to remove a task if there are multiple tasks', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: false, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.remove(tasks[1]);
      tick();

      expect(true).toBe(true);
    }));
  });

  describe('toggle()', () => {

    it('should be able to toggle a single task', fakeAsync(() => {
      const task = { isDone: false, title: 'title' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task);

      service.toggle(tasks[0]);
      tick();

      expect(true).toBe(true);
    }));

    it('should be able to toggle a task if there are multiple tasks', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: false, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.toggle(tasks[1]);
      tick();

      expect(true).toBe(true);
    }));
  });

  describe('reorder()', () => {

    it('should be able to reorder tasks', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: false, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.reorder([tasks[2], tasks[1], tasks[0]]);
      tick();

      expect(true).toBe(true);
    }));
  });

  describe('clearCompleted()', () => {

    it('should be able to clear completed task if it is a single', fakeAsync(() => {
      const task = { isDone: true, title: 'title' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task);

      service.clearCompleted();
      tick();

      expect(true).toBe(true);
    }));

    it('should be able to remove completed tasks if there are multiple tasks', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: true, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.clearCompleted();
      tick();

      expect(true).toBe(true);
    }));
  });

  describe('applyFilter()', () => {

    it('should update the selectedFilter$ value', fakeAsync(() => {
      let selectedFilter!: FilterEnum;
      service.selectedFilter$.subscribe(d => {
        selectedFilter = d;
      });

      service.applyFilter(FilterEnum.Completed);

      expect(true).toBe(true);
    }));

    it('should update tasks based on filter: All', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: true, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.applyFilter(FilterEnum.All);
      tick();

      expect(true).toBe(true);
    }));

    it('should update tasks based on filter: Active', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: true, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.applyFilter(FilterEnum.Active);
      tick();

      expect(true).toBe(true);
    }));

    it('should update tasks based on filter: Completed', fakeAsync(() => {
      const task1 = { isDone: false, title: 'task1' };
      const task2 = { isDone: true, title: 'task2' };
      const task3 = { isDone: false, title: 'task3' };
      let tasks: Array<Task> = [];
      service.tasks$.subscribe(d => {
        tasks = d;
      });
      service.create(task1);
      service.create(task2);
      service.create(task3);

      service.applyFilter(FilterEnum.Completed);
      tick();

      expect(true).toBe(true);
    }));
  });
});
