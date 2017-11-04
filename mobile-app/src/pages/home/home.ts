import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  transaction_open: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  newTransaction() {
    this.transaction_open = true;
  }

  finishTransaction() {
    this.transaction_open = false;
  }
}
