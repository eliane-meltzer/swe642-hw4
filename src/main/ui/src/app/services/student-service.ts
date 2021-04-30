import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {Student} from "../models/student";
import {Observable, of} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    postStudentUrl = "";
    getStudentsByIDUrl = "";
    getStudentsUrl = "";

    constructor(private http: HttpClient) { }

    /** POST: add a new hero to the server */
    addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.postStudentUrl, student, this.httpOptions).pipe(
            tap((student: Student) => console.log(`added hero w/ id=${student.studentID}`)),
            catchError(this.handleError<Student>('addHero'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}




