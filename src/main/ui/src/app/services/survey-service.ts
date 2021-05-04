import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {Student} from "../models/student";
import {Observable, of} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SurveyService {
  constructor() { }

//functions to call java API
  //LIST_ALL = "/list";
  //PROCESS_DATA = "/data";
  //SAVE_SURVEY = "/save";
  //GET_SURVEY = "/survey";
resu
    async getAllSurveyIDs(){
    //returns all user ID's that have taken the survey
    try {
      const response = await fetch('/api/list');
      return await response.json();
    } catch(e) {
      console.log(e);
      return [{id:0, basicinfoStudentid:'', basicinfoStudentname:''}];
    }
  }

    async retrieveSurveyData(values){
    //returns survey data for the given id
    const sub={id:values};
    console.log(JSON.stringify(sub));
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(sub),
      })
      return await response.json();
    } catch(e) {
      console.log(e);
      return null;
    }
  }
   async getProcessedData(values) {
    console.log("stringify values: " + JSON.stringify(values));
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(values)
      })
      return await response.json();
    } catch(e) {
      return {mean:0, stdDev:0, max:0};
    }

  }
   async saveStudentFormData(values){

     console.log("data: " + JSON.stringify(values));
    //saves the survey data in the database
    //returns the results from the insert procedure
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(values)
      })
      return await response.json();
    } catch(e) {
      console.log(e);
      return null;
    }
  }
}








