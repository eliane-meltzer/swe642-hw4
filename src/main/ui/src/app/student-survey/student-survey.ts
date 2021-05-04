import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Student } from '../models/student';
import {CookieService} from "../services/cookie-service";
import {SurveyService} from "../services/survey-service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {WelcomeDialog} from "../welcome-dialog/welcome-dialog";
import {Router, ActivatedRoute, ParamMap, Data} from '@angular/router';
import {DataService} from "../services/data-service";


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

  hear = ["Friends", "TV", "Online", "Other"];
  // likeMost = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
  likelihood = ['Very Likely', 'Likely',
    'Unlikely'];

  mean: any;
  stdDev: any;

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
      private dataService: DataService
  ) {

    this.myform = this.formBuilder.group({
      likeMost   : this.formBuilder.array(this.likeMost.map(x => !1)),
      hear : this.formBuilder.array(this.hear.map(x => !1))
    });
  }

  ngOnInit() {
    // this.dataService.currentMean.subscribe(message => this.mean = message)
    // this.dataService.currentStdDev.subscribe(message => this.stdDev = message)


    console.log("in oninit, going to open dialog...");
    this.surveyService.getAllSurveyIDs().then(function(result) {
      var obj = JSON.stringify(result);
      result.students.forEach(student => {
        console.log("student id: " + student.id);
      });
    });
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

  selectedOptions() { // right now: ['1','3']
    return this.likeMost
        .filter(opt => opt.checked)
        .map(opt => opt.value)
  }

  convertToValue(key: string) {
    return this.myform.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }

  onSubmit() {
    console.log("selected options: " + this.selectedOptions());
    this.submitted = true;
    // this.model.liked = [true, true, true, true, true, true];
    const valueToStore = Object.assign({}, this.myform.value, {
      likeMost: this.convertToValue('likeMost'),
      hear: this.convertToValue('hear')
    });
    console.log(valueToStore);

  this.surveyService.getProcessedData(this.data).then((dataResult) => {
    console.log(JSON.stringify(dataResult));
    this.dataService.setMean(dataResult.mean);
    this.dataService.setStdDev(dataResult.stdDev);

    this.surveyService.saveStudentFormData(this.model).then((result) => {
      console.log("result: " + result.toString());
      if(dataResult.mean >= 90)
        this.route.navigateByUrl('/winner-acknowledgement');
      else
        this.route.navigateByUrl('/simple-acknowledgement');
    });
    // this.mean = result.mean;
    // this.stdDev = result.stdDev;

    // result.students.forEach(student => {
    //   console.log("student id: " + student.id + " " +  student.studentid);
    //   this.students.push({id: student.id, studentid: student.studentid});
    // });
  });

    // this.dataService.setMean(this.mean);
    // this.dataService.setStdDev(this.stdDev);




  //   this.surveyService.saveStudentFormData(this.model).then((result) => {
  //     console.log("result: " + result.toString());
  //     // result.students.forEach(student => {
  //     //   console.log("student id: " + student.id + " " +  student.studentid);
  //     //   this.students.push({id: student.id, studentid: student.studentid});
  //     // });
  //   });
  //   // this.surveyService.saveStudentFormData(JSON.stringify(this.model))
  //   this.route.navigateByUrl('/simple-acknowledgement', { state: { data: 'HI THERE' } });
  //
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
