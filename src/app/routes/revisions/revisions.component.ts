import { Component, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css']
})
export class RevisionsComponent {
  revisions: any[];
  pageURL: string;
  revisionURL: string;
  currentSelected: boolean = true;
  loadedID: string;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get page URL
    this.route.params.subscribe((params) => {
      this.pageURL = params.pageURL;
      this.loadRevision(null);
    });
    this.getAllRevisions();
  }

  getDateTime(datetime) {
    let date = new Date(datetime);
    return date.toLocaleString();
  }

  loadRevision(id) {
    if (id == null) {
      this.loadedID = null;
      this.currentSelected = true;
      this.revisionURL = '/pages/' + this.pageURL;
    } else {
      this.loadedID = id;
      this.currentSelected = false;
      this.revisionURL = '/pages/admin/' + this.pageURL + '/revision/' + id;
    }
  }

  getAllRevisions() {
    this.requestService.get('/pages/admin/' + this.pageURL + '/revision', (data) => {
      this.revisions = data.results.reverse();
    }, null);
  }

  restoreRevision() {
    if(confirm("Are you sure you want to revert to this page?")) {
      this.requestService.post(this.revisionURL, {}, (data)=> {
        if (data.status === "Revision Restored") {
          this.getAllRevisions();
          this.loadRevision(null);
        } else {
          alert("Something went wrong.");
        }
      }, (error) => {
        alert("Something went wrong.");
      });
    }
  }

  backToEdit() {
    this.router.navigate(['/admin/edit/', this.pageURL]);
  }
}
