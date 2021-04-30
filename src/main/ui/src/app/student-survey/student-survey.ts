import {Component, NgModule, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {WelcomeDialog} from "../welcome-dialog/welcome-dialog";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'student-survey-form',
  templateUrl: './student-survey.html',
  styleUrls: ['./student-survey.css'],
  providers: [CookieService, FormBuilder]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ]})
export class StudentSurvey implements OnInit {
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
      private formBuilder:FormBuilder,
      private dialog: MatDialog,
      private route: Router,
  ) {

    this.myform = this.formBuilder.group({
      likeMost   : this.formBuilder.array(this.likeMost.map(x => !1)),
      hear : this.formBuilder.array(this.hear.map(x => !1))
    });
  }

  ngOnInit() {
    console.log("in oninit, going to open dialog...");
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.dialog.open(WelcomeDialog, dialogConfig);

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
      likeMost: this.convertToValue('likeMost'),
      hear: this.convertToValue('hear')
    });
    console.log(valueToStore);

    // if data()
    this.route.navigateByUrl('/simple-acknowledgement', { state: { data: 'HI THERE' } });

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newStudent() {
    this.model = new Student();
  }


  // Reveal in html:
  //   Name via form.controls = {{showFormControls(studentSurveyForm)}}
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }

}
