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

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.pageURL = params.pageURL;
      this.revisionURL = '/pages/' + this.pageURL;
    });

    this.requestService.get('/pages/admin/' + this.pageURL + '/revision', (data) => {
      this.revisions = data.results.reverse();
    }, null);
  }

  loadRevision(id) {
    this.revisionURL = '/pages/admin/' + this.pageURL + '/revision/' + id;
  }

  restoreRevision() {
    // TODO: post request for setting revision
  }
}
