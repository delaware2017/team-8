import { Component } from '@angular/core';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  locations = [
    {
      name: "Clark's Farm Stand",
      address: "11 N. Way St, Madison, WI 53703",
      time_away: "10 mins",
      distance_away: "2.6 miles",
      lat: 39.277543,
      lon: -74.579229
    }
  ];

  constructor() {}

}
