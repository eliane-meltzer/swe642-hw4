import {Component, NgModule, OnInit} from '@angular/core';

import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'student-info',
  templateUrl: './student-info.html',
  styleUrls: ['./student-info.css'],
  providers: [CookieService, FormBuilder]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ]})
export class StudentInfo implements OnInit {
  // name: string;

  hear = ["Friends", "TV", "Online", "Other"];
  likeMost = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
  likelihood = ['Very Likely', 'Likely',
    'Unlikely'];
  myform: FormGroup;

  model = new Student();
  submitted = false;


  constructor(
      private cookie:CookieService,
      private formBuilder:FormBuilder
  ) {

    this.myform = this.formBuilder.group({
      likeMost   : this.formBuilder.array(this.likeMost.map(x => !1)),
      hear : this.formBuilder.array(this.hear.map(x => !1))
    });
  }

  ngOnInit() {

  //   this.myform = new FormGroup({
  //     first: new FormGroup({
  //       firstName: new FormControl('', Validators.required), (1)
  //     lastName: new FormControl('', Validators.required),
  //   }),
  //       email: new FormControl('', [ (2)
  //     Validators.required,
  //     Validators.pattern("[^ @]*@[^ @]*") (3)
  //   ]),
  //       password: new FormControl('', [
  //     Validators.minLength(8), (4)
  //     Validators.required
  //   ]),
  //       language: new FormControl() (5)
  // });
    // this.name = this.cookie.getCookie("test");
  }



  setCookie() {
    this.cookie.setCookie("test", "success", 30)
    console.log("setting cookie test to success");
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name}
  //   });



  convertToValue(key: string) {
    return this.myform.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }

  onSubmit() {
    this.submitted = true;
    const valueToStore = Object.assign({}, this.myform.value, {
      cities: this.convertToValue('likeMost'),
      zip_codes: this.convertToValue('hear')
    });
    console.log(valueToStore);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newStudent() {
    this.model = new Student();
  }

  // skyDog(): Student {
  //   const myHero =  new Student(42, 'SkyDog',
  //                          'Fetch any object at any distance',
  //                          'Leslie Rollover');
  //   console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
  //   return myHero;
  // }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(studentSurveyForm)}}
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }

  /////////////////////////////

}

export class ComponentOverviewComponent {

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/