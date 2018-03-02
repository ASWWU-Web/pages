import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";
import { SEARCHABLE_FIELDS } from '../../shared/fields';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})

export class SearchComponent {
  searchableFields: string[] = SEARCHABLE_FIELDS
  criteria: string[][] = [['','']];
  categories: string[] = [];
  departments: string[] = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
  this.requestService.get('/pages/categories', (data) => {
    for(let category of data.categories) {
      this.categories.push(category['category'])
    }
  }, null)
  this.requestService.get('/pages/departments', (data) => {
    for(let department of data.departments) {
      this.departments.push(department['department'])
    }
  }, null)
}

  addField() {
    this.criteria.push(['', '']);
    console.log(this.criteria);
  }

  removeField(i) {
    this.criteria.splice(i, 1);
  }
}
