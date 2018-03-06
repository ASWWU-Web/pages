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
  allTags: string[] = [];     // TODO: get a list of tags from the server.
  editors: string[] = [];
  allUsers: any[] = [];

  public options: Object = {
    imageUploadURL: environment.SERVER_URL + '/pages/media/upload_image',
    imageManagerLoadURL: environment.SERVER_URL + '/pages/media/load_images'
  };

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/admin/' + params.pageURL), (data) => {
        this.page = data;
        this.editors = data.editors;
      }, null );
    });
    this.requestService.get('/pages/categories', (data)=> {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/departments', (data)=> {
      this.departments = data.departments;
    }, null)
    this.requestService.get('/pages/tags/', (data) => this.allTags = data, null);
    this.requestService.get('/search/all', (data) => {
      this.allUsers = data.results.map((user)=> {
        user.value = user.username;
        user.display = user.full_name;
        return user;
      });
    }, null);

  }

  ngOnInit() {

  }

  save(onSucessfulSave) {
    // Remove unwanted attributes from JSON.
    let ignoredKeys = ["updated_at", "current", "created", "url", "editors"];
    let filteredPage = Object.assign({}, this.page);
    for(let i in ignoredKeys){
      delete filteredPage[ignoredKeys[i]];
    }

    //Add editors as an array of username strings.
    filteredPage.editors = this.editors.map((user: any) => {
      if (typeof(user) == "string") { return user }
      return user.username;
    })

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
