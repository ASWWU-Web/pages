import { Component, OnInit, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { environment } from "../../../environments/environment";
import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  page: any = {};
  departments: string[] = [];
  categories: string[] = [];
  tags: string[] = [];     // TODO: get a list of tags from the server.

  public options: Object = {
    imageUploadURL: environment.SERVER_URL + '/pages/media/upload_image',
    imageManagerLoadURL: environment.SERVER_URL + '/pages/media/load_images'
  };

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/' + params.pageURL), (data) => this.page = data, null );
    });
    this.requestService.get('/pages/category', (data)=> {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/department', (data)=> {
      this.departments = data.departments;
    }, null)
  }

  ngOnInit() {

  }

  save(onSucessfulSave) {
    // Remove unwanted attributes from JSON.
    let ignoredKeys = ["updated_at", "current", "created", "url"];
    let filteredPage = Object.assign({}, this.page);
    for(let i in ignoredKeys){
      delete filteredPage[ignoredKeys[i]];
    }

    // Send New Page to server.
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
