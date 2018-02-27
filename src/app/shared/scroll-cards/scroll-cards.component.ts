import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'scroll-cards',
  templateUrl: './scroll-cards.component.html',
  styleUrls: ['./scroll-cards.component.css']
})

export class ScrollCardsComponent implements OnInit {
  @Input() scrollType: string;

  page: any = {};
  featureds: any = [];
  categories: any = [];
  departments: any = [];
  events: any = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/' + params.pageURL), (data) => this.page = data, null );
    });
    this.requestService.get('/pages/featureds', (data) => {
      this.featureds = data.featureds;
    }, null)
    this.requestService.get('/pages/categories', (data) => {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments;
    }, null)
  }

  ngOnInit() {
    
  }
}
