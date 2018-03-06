import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../RequestService/request.service';
import { ProfileSmComponent } from '../shared';
import { CURRENT_YEAR } from '../../config';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.css'],
  providers: [ RequestService ],
})

export class PageResultsComponent {
  @Input() query: string;

  results: any[] = [];
  shownResults: any[] = [];
  shown: number = 0;
  searching: boolean = false;

  constructor (private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

  ngOnChanges() {
    this.shownResults = [];
    this.shown = 0;
    this.update();
  }

  ngOnInit() {
    if(!this.query){
      this.query = "";
    }
  }

  update() {
    this.requestService.get('/pages/search', (data) => {
      this.results = data.results;
    }, null)
  }

  showMore() {
    var cIndex = this.shown;
    var nIndex = cIndex + 24;
    this.shownResults = this.shownResults.concat(this.results.slice(cIndex,nIndex));
    this.shown = nIndex;
    // Set searching to false
    this.searching = false;
  }
}
