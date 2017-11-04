import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  first_name: String = "";
  last_name: String = "";
  email_address: String = "";
  phone_number: String = "";
  family_members: String = "";

  error_message: String = "";

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  next() {
    this.slides.lockSwipes(false);

    if (this.slides.getActiveIndex() == 0) {
      // do necessary calls to validate access code and then continue
      this.slides.slideNext();
    }

    this.slides.lockSwipes(true);
  }

  signUp() {
    if (this.first_name && this.last_name && this.email_address && this.phone_number && this.family_members) {
      //try to signup
    } else {
      this.error_message = "Please fill out all fields";
      this.navCtrl.setRoot(HomePage);
    }
  }
}
