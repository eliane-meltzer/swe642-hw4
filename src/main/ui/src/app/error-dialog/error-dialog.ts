import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from "../services/cookie-service";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'welcome-dialog',
    templateUrl: './error-dialog.html',
    styleUrls: ['./error-dialog.css'],
    providers: [CookieService]
})

export class ErrorDialog implements OnInit {

    error: string;

    constructor(
        public dialogRef: MatDialogRef<ErrorDialog>,
        private cookie: CookieService,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
    }

    ngOnInit() {
        this.error = this.data.errorMessage;

    }

    // If the user clicks the cancel button a.k.a. the go back button, then\
    // just close the modal
    close() {
        this.dialogRef.close();
    }
}