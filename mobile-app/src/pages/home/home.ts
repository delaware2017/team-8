import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  transaction_open: boolean = false;

  navigator: any;
  Connection: any;

  constructor() {}

  newTransaction() {
    this.transaction_open = true;
  }

  finishTransaction() {
    this.transaction_open = false;
  }
}
