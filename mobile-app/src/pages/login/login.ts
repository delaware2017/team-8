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
    this.slides.lockSwipes(true);
  }

  login() {
    if (this.username && this.password) {
      this.error_message = "";

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.httpClient.post(this.config.getAPILocation() + '/login', {username: this.username, password: this.password}, {responseType: 'text'}).subscribe(data => {
        loading.dismiss();
        if (data) {
          this.iam.setCurrentUser(data);
          this.navCtrl.setRoot(TabsPage);
        } else {
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
