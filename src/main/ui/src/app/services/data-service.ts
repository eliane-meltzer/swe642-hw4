// @ts-ignore
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private meanSource = new BehaviorSubject(0);
    currentMean = this.meanSource.asObservable();

    private stdDevSource = new BehaviorSubject(0);
    currentStdDev = this.stdDevSource.asObservable();

    constructor() { }

    setMean(num: number) {
        this.meanSource.next(num);
    }

    setStdDev(num: number) {
        this.stdDevSource.next(num);
    }
}