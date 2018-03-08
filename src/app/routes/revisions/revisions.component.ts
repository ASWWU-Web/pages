import { Component, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css']
})
export class RevisionsComponent {
  revisions: any;
  pageURL: string;
  revisionURL: string;
  current: boolean = true;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get page URL
    this.route.params.subscribe((params) => {
      this.pageURL = params.pageURL;
      this.loadRevision(null);
    });
    this.getAllRevisions();
  }

  loadRevision(id) {
    if (id == null) {
      this.current = true;
      this.revisionURL = '/pages/' + this.pageURL;
    } else {
      this.current = false;
      this.revisionURL = '/pages/admin/' + this.pageURL + '/revision/' + id;
    }
  }

  getAllRevisions() {
    this.requestService.get('/pages/admin/' + this.pageURL + '/revision', (data) => {
      this.revisions = data.results.reverse();
    }, null);
  }

  restoreRevision() {
    this.requestService.post(this.revisionURL, {}, (data)=> {
      console.log(data);
      this.getAllRevisions();
    }, (error) => {
      alert(error.message);
    });
  }
}
