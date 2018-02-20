import { Component, OnInit, NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css']
})
export class RevisionsComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  ngOnInit() {

  }

}
