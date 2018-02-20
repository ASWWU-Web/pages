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

  constructor(private requestService: RequestService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/' + params.pageURL), (data) => this.page = data,(error) => {
        alert(error.message);
      } );
    });
    this.requestService.get('/pages/category', (data)=> {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/departments', (data)=> {
      this.categories = data.departments;
    }, null)
  }

  ngOnInit() {

  }

  save() {
    this.requestService.postFormData('/pages/admin/edit', this.page, (data)=> {
      // TODO: Redirect to the page if everything is okay.
      // this.router.navigate([this.page.url])
    }, (error) => {
      alert(error.message);
      console.log(error);
    });
  }
}
