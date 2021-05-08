import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import {CookieService} from "../services/cookie-service";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'welcome-dialog',
    templateUrl: './welcome-dialog.html',
    styleUrls: ['./welcome-dialog.css'],
    providers: [CookieService]
})

export class WelcomeDialog implements OnInit {

    name: string;
    show: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<WelcomeDialog>,
        private cookie: CookieService,

    ) { }

    ngOnInit() {
        this.name = this.cookie.getCookie("username");
        console.log("name is: " + this.name);
        if(!this.name) {
            this.show = false;
            this.reset();
        }
        else {
            console.log("name is set");
            this.show = true;
        }
    }

    // When the user clicks the action button a.k.a. the logout button in the\
    // modal, show an alert and followed by the closing of the modal
    reset() {
        this.name = prompt("Please enter your name");
        this.cookie.setCookie("username", this.name, 30)
        console.log("updated cookie to: " + this.cookie.getCookie("username"));
        // function setName() {
        //     console.log("in set name");
        //     user = prompt("Please enter your name:","");
        //     if (user != "" && user != null) {
        //         setCookie("username", user, 30);
        //     }
        //     location.reload();
        // }
        // this.close();
    }

    // If the user clicks the cancel button a.k.a. the go back button, then\
    // just close the modal
    close() {
        this.dialogRef.close();
    }

    getGreeting() {
        var d = new Date();
        var time = d.getHours();

        if (time < 12) {
            return("Good morning");
        }
        else if (time >= 12 && time < 17) {
            return("Good afternoon");
        }
        else {
            return("Good evening");
        }
    }

}