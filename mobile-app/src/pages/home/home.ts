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
    if (this.iam.getCurrentUser()) {
      this.httpClient.post(this.config.getAPILocation() + '/balance', {id: this.iam.getCurrentUser()}, {responseType: 'text'}).subscribe(data => {
        if (data) {
          this.balance = Number(data);
        }
      });
    }

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

  getBalanceFormatted() {
    return "$" + this.balance.toFixed(2);
  }

  newTransaction() {
    this.max_amount = "";
    this.transaction_open = true;
  }

  finishTransaction() {
    this.transaction_open = false;
  }

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
