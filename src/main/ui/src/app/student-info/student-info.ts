import {Component, NgModule, OnInit} from '@angular/core';

import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../services/survey-service";
import {DataService} from "../services/data-service";

@Component({
  selector: 'student-info',
  templateUrl: './student-info.html',
  styleUrls: ['./student-info.css'],
  providers: [CookieService, FormBuilder, SurveyService, DataService]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ]})
export class StudentInfo implements OnInit {
  myform: FormGroup;
  id: any;
  model = new Student();
  submitted = false;

  studentID: {id: 0};

  constructor(
      private cookie:CookieService,
      private formBuilder:FormBuilder,
      private activatedRoute:ActivatedRoute,
      private surveyService:SurveyService
  ) {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("this id: " + this.id);
    // this.studentID.id = this.id;
  }

  ngOnInit() {

    this.surveyService.retrieveSurveyData(this.id).then((result) => {
      console.log(JSON.stringify(result));

      console.log("id: " + result.id);
      this.model = result;
      console.log("student id from model: " + this.model.studentid);

      console.log("");

    });

  }

  convertToValue(key: string) {
    return this.myform.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }
}

export class ComponentOverviewComponent {

}

export interface getStudent{
  id:number;
  studentid:number;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/