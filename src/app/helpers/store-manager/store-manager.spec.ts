/* eslint-disable no-magic-numbers */
import { fakeAsync, tick } from '@angular/core/testing';

import { Task } from '../../models';
import { StoreManager } from './store-manager';


describe('StoreManager', () => {
  const [task1, task2, task3] = [new Task('1', false, 'task1'), new Task('2', false, 'task2'), new Task('3', false, 'task3')];

  let setItemSpy: jasmine.Spy<jasmine.Func>;
  let removeItemSpy: jasmine.Spy<jasmine.Func>;
  let storeManager: StoreManager;

  beforeEach(() => {
    setItemSpy = jasmine.createSpy('setItem');
    removeItemSpy = jasmine.createSpy('removeItem');

    storeManager = new StoreManager(Object.create({
      setItem: (key: string, value: string) => {
        setItemSpy(key, value);
      },
      removeItem: (key: string) => {
        removeItemSpy(key);
      },
    }));
  });

  describe('add()', () => {

    it('should correctly update tasks property', fakeAsync(() => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      tick();

      expect(storeManager.tasks).toEqual([task3, task2, task1]);
    }));

    it('should correctly update storage for an single item', () => {
      storeManager.add(task1);

      expect(setItemSpy.calls.first().args[1]).toEqual(task1.deparse());
    });

    it('should correctly update storage for 2 items', () => {
      storeManager.add(task1);
      storeManager.add(task2);

      expect(removeItemSpy.calls.count()).toBe(1);
      expect(setItemSpy.calls.count()).toBe(3);
    });

    it('should correctly update storage for 3 items', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);

      expect(removeItemSpy.calls.count()).toBe(2);
      expect(setItemSpy.calls.count()).toBe(5);
    });
  });

  describe('remove()', () => {

    it('should correctly update tasks property when remove a single item', fakeAsync(() => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);

      storeManager.remove(task2);
      tick();

      expect(storeManager.tasks).toEqual([task3, task1]);
    }));

    it('should correctly update tasks property when remove multiple items', fakeAsync(() => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);

      storeManager.remove([task1, task3]);
      tick();

      expect(storeManager.tasks).toEqual([task2]);
    }));

    it('should correctly update storage when remove the last item', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      removeItemSpy.calls.reset();

      storeManager.remove(task1);

      expect(removeItemSpy.calls.count()).toBe(1);
    });

    it('should correctly update storage when remove the item in the middle', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      removeItemSpy.calls.reset();

      storeManager.remove(task2);

      expect(removeItemSpy.calls.count()).toBe(2);
    });
  });

  describe('update()', () => {

    it('should correctly update tasks property after update', fakeAsync(() => {
      const updatedTask = task1.toggle();
      storeManager.add(task1);
      storeManager.add(task2);

      storeManager.update(updatedTask);

      expect(storeManager.tasks).toEqual([task2, updatedTask]);
    }));

    it('should correctly update storage when update the last item', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      setItemSpy.calls.reset();
      removeItemSpy.calls.reset();

      storeManager.update(task1.toggle());

      expect(removeItemSpy.calls.count()).toBe(1);
      expect(setItemSpy.calls.count()).toBe(1);
    });

    it('should correctly update storage when update the item in the middle', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      setItemSpy.calls.reset();
      removeItemSpy.calls.reset();

      storeManager.update(task2.toggle());

      expect(removeItemSpy.calls.count()).toBe(2);
      expect(setItemSpy.calls.count()).toBe(2);
    });
  });

  describe('reorder()', () => {

    it('should correctly update tasks property after reorder', fakeAsync(() => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);

      storeManager.reorder([task1, task2, task3]);

      expect(storeManager.tasks).toEqual([task1, task2, task3]);
    }));

    it('should correctly update storage when reorder the last item', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      setItemSpy.calls.reset();
      removeItemSpy.calls.reset();

      storeManager.reorder([task3, task1, task3]);

      expect(removeItemSpy.calls.count()).toBe(2);
      expect(setItemSpy.calls.count()).toBe(2);
    });

    it('should correctly update storage when revert items', () => {
      storeManager.add(task1);
      storeManager.add(task2);
      storeManager.add(task3);
      setItemSpy.calls.reset();
      removeItemSpy.calls.reset();

      storeManager.reorder([task1, task2, task3]);

      expect(removeItemSpy.calls.count()).toBe(3);
      expect(setItemSpy.calls.count()).toBe(3);
    });
  });
});
