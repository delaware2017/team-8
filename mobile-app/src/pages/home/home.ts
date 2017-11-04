import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  transaction_open: boolean = false;

  navigator: any;
  Connection: any;

  constructor(private platform: Platform) {}

  newTransaction() {
    this.transaction_open = true;
  }

  finishTransaction() {
    this.transaction_open = false;
  }
}
