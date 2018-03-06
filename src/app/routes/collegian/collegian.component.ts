import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './collegian.component.html',
  styleUrls: ['./collegian.component.css']
})

export class CollegianComponent {
  archives: any[];
  thisWeek: any[] = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get all pages
    this.requestService.get('/pages/search?department=Collegian', (data) => {
      // set archive pages
      this.archives = data.results.reverse();

      // get pages from the past week
      let currentTime = Date.now();
      for (let page of this.archives) {
        let pageTime = Date.parse(page.created);
        if (currentTime - pageTime < 604800000) { // 1 week is 604800000 milliseconds
          this.thisWeek.push(page);
        } else {
          break;
        }
      }
    }, null)
  }
}
