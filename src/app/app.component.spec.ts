import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


@Component({
  selector: 'app-new-task, app-task-list, app-actions',
  template: 'component-stub',
})
export class ComponentStub { }

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [
        AppComponent,
        ComponentStub,
      ],
    }).compileComponents();
  });
});
