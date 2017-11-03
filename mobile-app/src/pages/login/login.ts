import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }
}
