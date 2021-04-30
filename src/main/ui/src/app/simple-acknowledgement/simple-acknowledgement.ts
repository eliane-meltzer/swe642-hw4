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
  templateUrl: './simple-acknowledgement.html',
  styleUrls: ['./simple-acknowledgement.css'],
  providers: [CookieService, FormBuilder]
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

    this.myform = this.formBuilder.group({
      likeMost: this.formBuilder.array(this.likeMost.map(x => !1)),
      hear: this.formBuilder.array(this.hear.map(x => !1))
    });
  }

  ngOnInit() {
    // const s = this.router.getCurrentNavigation().extras.state;
    // alert(s.data);

    this.http.get<any>('insert get students url here').subscribe(data => {
      this.students = data.Students;
    })

    this.students = ['1234', '4321', '123', '12', '3241','4123'];

  }


}