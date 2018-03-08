import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";
import { GENERAL_SEARCH_FIELD } from "../../shared/fields";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchText: string;
  featureds: any = [];
  events: any = [];
  categories: any = [];
  departments: any = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get featureds data
    this.requestService.get('/pages/featureds', (data) => {
      this.featureds = data.featureds.reverse();
    }, null)
    // get events data
    this.requestService.get('/pages/search?category=Event', (data) => {
      this.events = data.results.reverse();
    }, null)
    // get categories data
    this.requestService.get('/pages/categories', (data) => {
      this.categories = data.categories.filter((category) => category['category'] != 'Event');
    }, null)
    // get departments data
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments;
    }, null)
  }

  queryJson() {
    let json = {};
    json[GENERAL_SEARCH_FIELD] = this.searchText;
    return json;
  }
}
