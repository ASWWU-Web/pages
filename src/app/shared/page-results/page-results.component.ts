import { Component, Input } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.css']
})
export class PageResultsComponent {
  @Input() query: string;
  results: any = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.requestService.get('/pages/search', (data) => {
      this.results = data.results;
    }, null)
  }
}
