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
      this.departments = data.departments;
    }, null)
  }

  ngOnInit() {
  }

  save(onSucessfulSave) {
    let ignoredKeys = ["updated_at", "current", "created", "url"];
    let filteredPage = Object.assign({}, this.page);
    for(let i in ignoredKeys){
      delete filteredPage[ignoredKeys[i]];
    }
    this.requestService.post('/pages/admin/' + this.page.url, filteredPage, (data)=> {
      if(onSucessfulSave && typeof(onSucessfulSave) == "function") {
        onSucessfulSave()
      }
    }, (error) => {
      alert(error.message);
    });
  }

  preview() {
    this.save(() => {
      this.router.navigate([this.page.url]);
    })
  }
}
