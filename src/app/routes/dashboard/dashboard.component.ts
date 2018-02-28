import { Component, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  featureds: any = [];
  categories: any = [];
  departments: any = [];
  events: any = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.requestService.get('/pages/featureds', (data) => {
      this.featureds = data.featureds;
    }, null)
    this.requestService.get('/pages/categories', (data) => {
      this.categories = data.categories;
      for(let category in this.categories) {
        if(this.categories[category]['category'] == 'Events') {
          this.categories.splice(category, 1);
          break;
        }
      }
    }, null)
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments;
    }, null)
  }

  ngOnInit() {

  }
}
