import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { ConfigService } from '../../services/config.service';
import { IAMService } from '../../services/iam.service';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage implements OnInit {

  locations;

  constructor(private httpClient: HttpClient, private config: ConfigService, private iam: IAMService) {}

  ngOnInit() {
    this.httpClient.post(this.config.getAPILocation() + '/nearestStores', {}).subscribe(data => {
      if (data) {
        this.locations = data;
        console.log(this.locations);
      }
    });
  }

}
