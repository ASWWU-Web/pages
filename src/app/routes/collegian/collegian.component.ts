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
  searchText: string;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get all pages
    this.requestService.get('/pages/search?department=Collegian', (data) => {
      // set archive pages
      this.archives = data.results.reverse();

      // get pages from the past week
      let currentTime = Date.now();
      for (let i = 0; i < this.archives.length; i++) {
        let pageTime = Date.parse(this.archives[i].created);
        if (currentTime - pageTime < 604800000) {  // 1 week is 604800000 milliseconds
          this.thisWeek.push(this.archives[i]);
        } else {
          this.archives.splice(0, i);
          break;
        }
      }
    }, null)
  }

  search() {
    this.router.navigate(['/search'], {
      queryParams: {
        'department': 'Collegian', 'title': this.searchText
      }
    });
  }
}
