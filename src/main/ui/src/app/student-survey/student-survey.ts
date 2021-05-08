import {Component, Inject, NgModule, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {SurveyService} from "../services/survey-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {WelcomeDialog} from "../welcome-dialog/welcome-dialog";
import {Router, ActivatedRoute, ParamMap, Data} from '@angular/router';
import {DataService} from "../services/data-service";
import {ErrorDialog} from "../error-dialog/error-dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'student-survey-form',
  templateUrl: './student-survey.html',
  styleUrls: ['./student-survey.css'],
  providers: [CookieService, FormBuilder, SurveyService]
})

@NgModule({
  imports: [
    BrowserModule /* or CommonModule */,
    FormsModule, ReactiveFormsModule
  ]})
export class StudentSurvey implements OnInit {
  // name: string;

  heard = ["Friends", "TV", "Online", "Other"];
  // likeMost = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
  recommend = ['Very Likely', 'Likely',
    'Unlikely'];
errorMessage: string = "";
  // mean: any;
  // stdDev: any;

  likeMost = [
    {name:'Students', value:'Students', checked:false},
    {name:'Location', value:'Location', checked:false},
    {name:'Campus', value:'Campus', checked:false},
    {name:'Atmosphere', value:'Atmosphere', checked:false},
    {name:'Dorm Rooms', value:'Dorm Rooms', checked:false},
    {name:'Sports', value:'Sports', checked:false}
  ]

  myform: FormGroup;
  data: string;
  model = new Student();
  submitted = false;

  constructor(
      private cookie:CookieService,
      private surveyService:SurveyService,
      private formBuilder:FormBuilder,
      private dialog: MatDialog,
      private route: Router,
      private dataService: DataService,
  ) {

    this.myform = this.formBuilder.group({
      likeMost   : this.formBuilder.array(this.likeMost.map(x => !1)),
      heard : this.formBuilder.array(this.heard.map(x => !1))
    });
  }

  ngOnInit() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      const modalDialog = this.dialog.open(WelcomeDialog, dialogConfig);
  }


  reset() {
    this.model = new Student();
    this.data = "";
  }

  selectedOptions() {
    return this.likeMost
        .filter(opt => opt.checked)
        .map(opt => opt.value)
  }

  convertToValue(key: string) {
    return this.myform.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }

  validate(): boolean {
    let AlphaRegEx = /([^a-z ])/i;
    let AlphaNumericRegEx = /([^a-z\d ])/i;
    let EmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
    let formError = false;
    this.errorMessage = "";

    var firstNameValid = !(AlphaRegEx.test(this.model.studentname));

    if(!firstNameValid) {
      this.errorMessage += "Invalid student name: " + this.model.studentname+ "<br/>";
      this.errorMessage += "Student name must contain letters only  <br/><br/>";
      this.model.studentname = "";
      formError = true;
    }

    var addressValid = !(AlphaNumericRegEx.test(this.model.street));
    if(!addressValid) {
      this.errorMessage += "Invalid address: " + this.model.street + "<br/>";
      this.errorMessage += "Address must contain letters and numbers only <br/><br/>";
      this.model.street = "";
      formError = true;
    }

    var emailValid = (EmailRegEx.test(this.model.email));
    if(!emailValid) {
      this.errorMessage  += "Invalid email: " + this.model.email + "<br/>";
      this.errorMessage  += "Email must be in the following format: example@gmail.com <br/><br/>";
      this.model.email = "";
      formError = true;
    }
    var numChecked = 0;
    console.log("before for each");
    this.likeMost.forEach( like => {
        if(like.checked) {
          numChecked++
          console.log(like.name + " is checked ")
        }
        });

    if(numChecked < 2) {
      this.errorMessage += "At least two checkboxes must be checked <br/>";
      formError = true;
    }

    if(formError) {
      const dailogRef = this.dialog.open(ErrorDialog, {
        width: '350px',
        height: '800px',
        data: {
          errorMessage: this.errorMessage
        }
      });
    }

    if(formError) {
      return false;
    } else
      return true;
  }


  onSubmit() {

    var valid = this.validate();

    console.log("selected options: " + this.selectedOptions());
    this.submitted = true;

    const valueToStore = Object.assign({}, this.myform.value, {
      likeMost: this.convertToValue('likeMost'),
      heard: this.convertToValue('heard')
    });
    console.log(valueToStore);

    this.model.liked = null;

    console.log("this is the model: " + JSON.stringify(this.model));


    if(valid) {

      this.surveyService.getProcessedData(this.data).then((dataResult) => {
        console.log(JSON.stringify(dataResult));
        this.dataService.setMean(dataResult.mean);
        this.dataService.setStdDev(dataResult.stdDev);

        this.surveyService.saveStudentFormData(this.model).then((result) => {
          console.log("result: " + result.toString());
          if (dataResult.mean >= 90)
            this.route.navigateByUrl('/winner-acknowledgement');
          else
            this.route.navigateByUrl('/simple-acknowledgement');
        });
      });
    }
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
