import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";
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
  query: string;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // check for query params in url
    this.route.queryParamMap.subscribe( params => {
      this.criteria = [];
      for (let key of params.keys) {
        this.criteria.push([key, params.get(key)]);
      }
<<<<<<< HEAD
      if (this.criteria.length == 0) {
        this.criteria.push([GENERAL_SEARCH_FIELD, '']);
      } else {
=======
      if(this.criteria.length == 0) {
        this.criteria.push([GENERAL_SEARCH_FIELD, '']);
      }
      else {
>>>>>>> 85ea4f55a3457d5a6348e580a99479c905b8681b
        this.search();
      }
    });

    // get categories and departments
    this.requestService.get('/pages/categories', (data) => {
      this.categories = data.categories.map((category) => {
        return category.category;
      });
    }, null)
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments.map((department) => {
        return department.department;
      });
    }, null)
}

  addField() {
    this.criteria.push(['', '']);
  }

  removeField(i) {
    this.criteria.splice(i, 1);
  }

  search() {
    let tempstring = '';
    for (let value of this.criteria) {
      tempstring += value[0] + "=" + value[1] + ";";
    }
    tempstring.slice(0, -1);
    this.query = tempstring;
  }
}
