import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { NavController, Slides, LoadingController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  access_code: string = "";

  firstName: string = "";
  lastName: string = "";
  username: string = "";
  password_1: string = "";
  password_2: string = "";
  email: string = "";
  numFamily: string = "";

  error_message: string = "";

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private httpClient: HttpClient, private alertCtrl: AlertController, private config: ConfigService, private iam: IAMService) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  next() {
    this.slides.lockSwipes(false);

    if (this.slides.getActiveIndex() == 0) {
      if (this.access_code) {
        this.error_message = "";
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        
        this.httpClient.post(this.config.getAPILocation() + '/accessCodes', {code: this.access_code}, {responseType: 'text'}).subscribe(data => {
          loading.dismiss();
          if (data == "valid code") {
            this.slides.slideNext();
          } else {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Your access code was not valid.',
              buttons: ['OK']
            });
            alert.present();
          }
          this.slides.lockSwipes(true);
        });
      } else {
        this.error_message = "Please fill out all fields";
      }
    }
  }

  signUp() {
    if (this.firstName && this.lastName && this.username && this.password_1 && this.password_2 && this.email && this.numFamily) {
      // all fields were filled out
      if (this.password_1 == this.password_2) {
        // password confirmations were the same

        this.error_message = "";

        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();

        let body = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password_1,
          email: this.email,
          code: this.access_code,
          numFamily: this.numFamily
        }
  
        this.httpClient.post(this.config.getAPILocation() + "/user/signup", body, {responseType: 'text'}).subscribe(data => {
          loading.dismiss();
          if (data) {
            // successful user registration, data equals user id
            this.iam.setCurrentUser(data);
  
            this.navCtrl.setRoot(TabsPage);
          } else {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Sign up failed.',
              buttons: ['OK']
            });
            alert.present();
          }
        });

      } else {
        this.error_message = "Passwords do not match";
      }
    } else {
      // all fields were not filled out
      this.error_message = "Please fill out all fields";
    }
  }
}
