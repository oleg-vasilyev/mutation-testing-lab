import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { WindowService } from '../window.service';


@Injectable()
export class WindowServiceStub {

  public getWindowSpy = jasmine.createSpy('getWindow');

  public constructor() {
    this.getWindowSpy.and.returnValue({
      localStorage: Object.create({
        setItem: () => { /* empty */ },
        removeItem: () => { /* empty */ },
      }),
    });
  }

  public getWindow(): Window {
    return this.getWindowSpy();
  }
}

export const WINDOW_SERVICE_PROVIDER = (): {
  provide: typeof WindowService;
  useValue: WindowServiceStub;
} => ({
  provide: WindowService,
  useValue: new WindowServiceStub(),
});

export const WINDOW_SERVICE_STUB = (): WindowServiceStub =>
  TestBed.inject(WindowService) as unknown as WindowServiceStub;
