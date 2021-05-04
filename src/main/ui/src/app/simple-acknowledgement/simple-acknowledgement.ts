import {Component, NgModule, OnInit} from '@angular/core';
import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import {SurveyService} from "../services/survey-service";
import {DataService} from "../services/data-service";



@Component({
  selector: 'student-survey-form',
  templateUrl: './simple-acknowledgement.html',
  styleUrls: ['./simple-acknowledgement.css'],
  providers: [CookieService, FormBuilder, SurveyService]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ],
  providers: [HttpClient]

})

export class SimpleAcknowledgement implements OnInit {
  // name: string;

  hear = ["Friends", "TV", "Online", "Other"];
  likeMost = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
  likelihood = ['Very Likely', 'Likely',
    'Unlikely'];
  myform: FormGroup;
  mean: any;
  stdDev: any;
  model = new Student();
  submitted = false;
  state$: any;
  data: string;
 students:studentList[] = [];

  constructor(
      private cookie: CookieService,
      private formBuilder: FormBuilder,
      public router: Router,
      private http: HttpClient,
      private surveyService:SurveyService,
      private dataService: DataService
  ) {

    this.students.push()

    // this.students.add({id: student.id, studentid: student.studentid});


    // this.students = new Map([]);
    // this.students.
    this.myform = this.formBuilder.group({
      likeMost: this.formBuilder.array(this.likeMost.map(x => !1)),
      hear: this.formBuilder.array(this.hear.map(x => !1))
    });
  }

  ngOnInit() {
    this.dataService.currentMean.subscribe(mean => this.mean = mean);
    this.dataService.currentStdDev.subscribe(stdDev => this.stdDev = stdDev);

    console.log("mean: " + this.mean);

    console.log("stdDev: " + this.stdDev);

    // this.extractData(res)
    //     .then((res) => this.extractData(res))

    this.surveyService.getAllSurveyIDs().then((result) => {
      result.students.forEach(student => {
        console.log("student id: " + student.id + " " +  student.studentid);
        this.students.push({id: student.id, studentid: student.studentid});
      });
    });
  }

//   getStudent(studentid: number) {
// console.log("get this student: " + studentid);
//   }


}
export interface studentList{
  id:number;
  studentid:number;
}