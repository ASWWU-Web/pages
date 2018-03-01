import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'search-scroll-cards',
  templateUrl: './search-scroll-cards.component.html',
  styleUrls: ['./search-scroll-cards.component.css']
})

export class SearchScrollCardsComponent implements OnInit {
  @Input() requestData: any;
  @Input() searchKey: string;

  constructor() {

  }

  ngOnInit() {

  }
}
