import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { ViewController, LoadingController, NavParams } from 'ionic-angular';

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';

@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
export class ScannerPage {

  max: string;

  error_message: string = "";

  amount: string = "";
  retailer: string = "";

  constructor(private viewCtrl: ViewController, private httpClient: HttpClient, private config: ConfigService, private loadingCtrl: LoadingController, private iam: IAMService, private navParams: NavParams) {}

  ngOnInit() {
    this.max = this.navParams.get('max');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  makeTransaction() {
    if (this.amount && this.retailer) {
      this.error_message = "";

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.httpClient.post(this.config.getAPILocation() + '/' + this.iam.getCurrentUser() + "/" + this.max, {deduct: this.amount, retailer: this.retailer}, {responseType: 'text'}).subscribe(data => {
        loading.dismiss();
        this.close();
      });

    } else {
      this.error_message = "Please fill out all fields";
    }
  }
}
