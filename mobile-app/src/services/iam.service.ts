import { Injectable } from '@angular/core';

@Injectable()
export class IAMService {
  local_balance: number;

  constructor() {}

  setCurrentUser(user_id) {
    localStorage.setItem('user_id', user_id);
  }

  getCurrentUser() {
    return localStorage.getItem('user_id');
  }
}