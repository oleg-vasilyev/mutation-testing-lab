import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ActionsComponent } from './actions/actions.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { AppComponent } from './app.component';

import { DataService } from './data-service/data.service';
import { WindowService } from './window-service/window.service';

import { NgStackFormsModule } from '@ng-stack/forms';


@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    TaskListComponent,
    ActionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgStackFormsModule,
  ],
  providers: [WindowService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
