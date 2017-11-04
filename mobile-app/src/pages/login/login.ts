import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  username: string;
  password: string;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.setRoot(TabsPage);
      loading.dismiss();
    }, 1000);
  }
}
