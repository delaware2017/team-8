import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { QRCodeModule } from 'angular2-qrcode';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { LocationsPage } from '../pages/locations/locations';
import { HistoryPage } from '../pages/history/history';

import { IAMService } from '../services/iam.service';
import { ConfigService } from '../services/config.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LandingPage,
    LoginPage,
    RegisterPage,
    HomePage,
    LocationsPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA0AHHZf_YsX00Iz1od2uMyeA5SlSxWXic'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LandingPage,
    LoginPage,
    RegisterPage,
    HomePage,
    LocationsPage,
    HistoryPage
  ],
  providers: [
    IAMService,
    ConfigService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
