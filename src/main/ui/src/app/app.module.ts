import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { StudentSurvey } from './student-survey/student-survey';
import { AppRoutingModule } from '../app-routing.module';
import {StudentInfo} from "./student-info/student-info";
import {WinnerAcknowledgement} from "./winner-acknowledgement/winner-acknowledgement";
import {SimpleAcknowledgement} from "./simple-acknowledgement/simple-acknowledgement";
import {WelcomeDialog} from "./welcome-dialog/welcome-dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import {ErrorDialog} from "./error-dialog/error-dialog";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    StudentSurvey,
    StudentInfo,
    WinnerAcknowledgement,
    SimpleAcknowledgement,
    WelcomeDialog,
    ErrorDialog
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [WelcomeDialog, ErrorDialog]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/