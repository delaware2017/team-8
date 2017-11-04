import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { ModalController } from 'ionic-angular';

import { ScannerPage } from '../scanner/scanner'; 

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  balance_download_interval;

  max_amount: string = "";

  balance: number = 0;

  transaction_open: boolean = false;

  constructor(private config: ConfigService, private iam: IAMService, private httpClient: HttpClient, private modalCtrl: ModalController) {}

  ngOnInit() {
    // download the users balance
    if (this.iam.getCurrentUser()) {
      this.httpClient.post(this.config.getAPILocation() + '/balance', {id: this.iam.getCurrentUser()}, {responseType: 'text'}).subscribe(data => {
        if (data) {
          this.balance = Number(data);
        }
      });
    }

    // keep downloading the users balance every second so it is up to date
    this.balance_download_interval = setInterval(() => {
      if (this.iam.getCurrentUser()) {
        this.httpClient.post(this.config.getAPILocation() + '/balance', {id: this.iam.getCurrentUser()}, {responseType: 'text'}).subscribe(data => {
          if (data) {
            this.balance = Number(data);
          }
        });
      }
    }, 1000);
  }

  // formats a number for display as currency
  getBalanceFormatted() {
    return "$" + this.balance.toFixed(2);
  }

  // called when user clicks new transaction button
  newTransaction() {
    this.max_amount = "";
    this.transaction_open = true;
  }

  // called when user clicks finish transaction button
  finishTransaction() {
    this.transaction_open = false;
  }

  // opens the fake scanner modal
  openScanner() {
    if (this.max_amount) {
      let modal = this.modalCtrl.create(ScannerPage, {max: this.max_amount});
      modal.present();
    } else {
      let modal = this.modalCtrl.create(ScannerPage, {max: this.balance});
      modal.present();
    }
  }
}
