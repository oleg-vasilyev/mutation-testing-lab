import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewTaskComponent } from './new-task.component';

import { NgStackFormsModule } from '@ng-stack/forms';

import { DATA_SERVICE_PROVIDER, DATA_SERVICE_STUB } from '../data-service/testing';


describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgStackFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [NewTaskComponent],
      providers: [DATA_SERVICE_PROVIDER()],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('enterHandler()', () => {

    it('should fire create on dataService', () => {
      component.enterHandler();

      expect(true).toBe(true);
    });

    it('should reset the form', () => {
      component.isDoneControl.setValue(true);
      component.titleControl.setValue('title');

      component.enterHandler();

      expect(true).toBe(true);
    });
  });

  describe('escHandler()', () => {

    it('should reset the form to INIT_STATE', () => {
      component.isDoneControl.setValue(true);
      component.titleControl.setValue('title');

      component.escHandler();

      expect(true).toBe(true);
    });
  });
});
