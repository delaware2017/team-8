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

  transactions;

  key_val = "retailer";
  ascending = true;

  constructor(private httpClient: HttpClient, private config: ConfigService, private iam: IAMService) {}

  ngOnInit() {
    setInterval(() => {
    if (this.iam.getCurrentUser()) {
      this.httpClient.post(this.config.getAPILocation() + '/transactions', {id: this.iam.getCurrentUser()}).subscribe((data:any) => {
        if (data) {
          this.transactions = data;
          for (let transaction of this.transactions) {
            transaction.date = moment(transaction.date).toDate();
          }
          this.transactions.sort(this.compare);
        }
      });
    }}, 1000);
  }

  compare(a,b) {
    return <any>new Date(b.date) - <any>new Date(a.date);
  }

  getBalanceFormatted(balance) {
    return "$" + Number(balance).toFixed(2);
  }

  formatDate(date) {
    return moment(date).subtract(4, 'hours').format("D MMMM YYYY, h:mm a");
  }
}
