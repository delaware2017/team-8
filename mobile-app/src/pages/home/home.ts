import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  balance: number = 0;

  transaction_open: boolean = false;

  navigator: any;
  Connection: any;

  constructor(private config: ConfigService, private iam: IAMService, private httpClient: HttpClient) {}

  ngOnInit() {
    setInterval(() => {
      this.httpClient.post(this.config.getAPILocation() + '/balance', {id: this.iam.getCurrentUser()}, {responseType: 'text'}).subscribe(data => {
        if (data) {
          this.balance = Number(data);
        }
      });
    }, 1000);
  }

  getBalanceFormatted() {
    return "$" + this.balance.toFixed(2);
  }

  newTransaction() {
    this.transaction_open = true;
  }

  finishTransaction() {
    this.transaction_open = false;
  }
}
