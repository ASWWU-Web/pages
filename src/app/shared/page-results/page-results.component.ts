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

  constructor (private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

  ngOnChanges() {
    this.update();
  }

  ngOnInit() {
    if(!this.query){
      this.query = "";
    }
  }

  update() {
    console.log(this.query);
    this.requestService.get('/pages/search?' + this.query, (data) => {
      this.results = data.results;
    }, null)
  }
}
