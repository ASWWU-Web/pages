import { Component, OnInit, NgModule } from '@angular/core';

import { DEPARTMENTS, CATEGORIES } from '../../shared/shared';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  page: any = {
    'url': "test",
    'title': "Title",
    'content': "<h1>test!</h1>",
    'owner': "ryan.rabello",
    'editors': ["ryan.rabello", "stephen.ermshar"],
    'is_visible': true,
    'created': "some valid date string",
    'tags': ["cool", "blue"],
    'category': "Article",
    'department': "Collegian",
    'description': "This is the description.",
    'current': true
  };
  departments: string[] = DEPARTMENTS;
  categories: string[] = CATEGORIES;

  constructor() { }

  ngOnInit() {

  }

}
