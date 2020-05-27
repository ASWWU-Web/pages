import { Component, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';
import { GENERAL_SEARCH_FIELD, SEARCHABLE_FIELDS } from '../../shared/fields';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})

export class SearchComponent {
  searchableFields: string[] = SEARCHABLE_FIELDS;
  criteria: string[][] = [];
  categories: string[] = [];
  departments: string[] = [];
  searchResults: any;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // check for query params in url
    this.route.queryParamMap.subscribe( params => {
      this.criteria = [];
      for (const key of params.keys) {
        this.criteria.push([key, params.get(key)]);
      }
      if (this.criteria.length === 0) {
        this.criteria.push([GENERAL_SEARCH_FIELD, '']);
      } else {
        this.search();
      }
    });

    // get categories and departments
    this.requestService.get('/pages/categories', (data) => {
      this.categories = data.categories.map((category) => {
        return category.category;
      });
    });
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments.map((department) => {
        return department.department;
      });
    });
  }

  ngOnInit() {
    this.search();
  }

  addField() {
    this.criteria.push(['', '']);
  }

  removeField(i) {
    this.criteria.splice(i, 1);
  }

  search() {
    // build query string
    let query = '';
    for (const value of this.criteria) {
      query += value[0] + '=' + value[1] + ';';
    }
    query.slice(0, -1);

    // run search
    this.requestService.get('/pages/search?' + query, (data) => {
      this.searchResults = data.results.reverse();
    });
  }

  formatField(field) {
    if (field === 'general') {
      return 'All Fields';
    } else if (field === 'url') {
      return 'URL';
    }
    return field.charAt(0).toUpperCase() + field.slice(1);
  }
}
