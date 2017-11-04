import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  api_location = "http://localhost:3000";

  constructor() {}

  getAPILocation() {
    return this.api_location;
  }
}