import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

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

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  next() {
    this.slides.lockSwipes(false);

    if (this.slides.getActiveIndex() == 0) {
      // do necessary calls to validate access code and then continue
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        loading.dismiss();
      }, 1000);
    }
  }

  signUp() {
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
