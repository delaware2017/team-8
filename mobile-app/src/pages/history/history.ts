import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import * as moment from 'moment';

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage implements OnInit {

  transactions; // the main list of transactions

  constructor(private httpClient: HttpClient, private config: ConfigService, private iam: IAMService) {}

  ngOnInit() {
    // download initial transaction history
    if (this.iam.getCurrentUser()) {
      this.httpClient.post(this.config.getAPILocation() + '/transactions', {id: this.iam.getCurrentUser()}).subscribe((data:any) => {
        if (data) {
          this.transactions = data;
        }
      });
    }

    // redownload data every second to keep it up to date
    setInterval(() => {
      if (this.iam.getCurrentUser()) {
        this.httpClient.post(this.config.getAPILocation() + '/transactions', {id: this.iam.getCurrentUser()}).subscribe((data:any) => {
          if (data) {
            this.transactions = data;
          }
        });
      }
    }, 1000);
  }

  // formats a number for display as currency
  getBalanceFormatted(balance) {
    return "$" + Number(balance).toFixed(2);
  }

  // formats a date to be pretty
  formatDate(date) {
    return moment(date).format("D MMMM YYYY, h:mm a");
  }
}
