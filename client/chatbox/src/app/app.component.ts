import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSignedIn: boolean;

  constructor() {  }

  ngOnInit() {
    this.isSignedIn = false;
   }

   setIsSignedIn(){
     this.isSignedIn = true;
   }

  }
