import { Component, OnInit, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { DEPARTMENTS, CATEGORIES } from '../../shared/shared';
import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  page: any = {};
  departments: string[] = [];
  categories: string[] = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/' + params.pageURL), (data) => this.page = data, null );
    });
    this.requestService.get('/pages/categories', (data)=> {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/departments', (data)=> {
      this.categories = data.departments;
    }, null)
  }

  ngOnInit() {

  }

  save() {
    let ignoredKeys = ["updated_at", "is_current"];
    let filteredPage = this.page;
    for(let key in ignoredKeys){
      delete filteredPage[key];
    }
    console.log(filteredPage);
    this.requestService.post('/pages/admin/edit', this.page, (data)=> {
      // TODO: Redirect to the page if everything is okay.
      this.router.navigate(['/pages/', this.page.url])
    }, (error) => {
      alert(error.message);
      console.log(error);
    });
  }
}
