import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';

import { IAMService } from '../services/iam.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, iam: IAMService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // if the user is already stored in localStorage, just log them in
    // other wise, send them to the landing page so they can sign up or login
    if (iam.getCurrentUser()) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LandingPage;
    }
  }
}

