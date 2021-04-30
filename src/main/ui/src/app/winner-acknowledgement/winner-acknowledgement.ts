import {Component, NgModule, OnInit} from '@angular/core';

import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'student-survey-form',
  templateUrl: './winner-acknowledgement.html',
  styleUrls: ['./winner-acknowledgement.css'],
  providers: [CookieService, FormBuilder]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ],
  providers: [HttpClient]

})

export class WinnerAcknowledgement implements OnInit {
  myform: FormGroup;
  model = new Student();
  submitted = false;
  state$: any;
  data: string;

  students: Array<String>

  constructor(
      private cookie: CookieService,
      private formBuilder: FormBuilder,
      public router: Router,
      private http: HttpClient
  ) {

  }

  ngOnInit() {

    this.students = ['1234', '4321', '123', '12', '3241','4123'];

  }


}