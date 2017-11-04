import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { NavController, Slides, LoadingController, AlertController } from 'ionic-angular';

import { IAMService } from '../../services/iam.service';
import { ConfigService } from '../../services/config.service';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  error_message: string;

  username: string;
  password: string;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private httpClient: HttpClient, private config: ConfigService, private iam: IAMService, private alertCtrl: AlertController) {}

  ngOnInit() {
    // lock the slides so the user cant swipe them
    this.slides.lockSwipes(true);
  }

  login() {
    // if the inputs are not blank
    if (this.username && this.password) {
      this.error_message = "";

      // display loader
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      // make request to API to check login details
      this.httpClient.post(this.config.getAPILocation() + '/login', {username: this.username, password: this.password}, {responseType: 'text'}).subscribe(data => {
        loading.dismiss();
        
        // if there is a successful response
        if (data) {
          // remove surrounding quotes
          data = data.substring(1, data.length - 1);
          
          // set the current user in localstorage to this user
          this.iam.setCurrentUser(data);

          // move to the main page
          this.navCtrl.setRoot(TabsPage);
        } else {
          // display error that login was unsuccessful
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Your login information was incorrect.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    } else {
      this.error_message = "Please fill out all fields";
    }
  }
}
