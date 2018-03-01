import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'pages-scroll-cards',
  templateUrl: './pages-scroll-cards.component.html',
  styleUrls: ['./pages-scroll-cards.component.css']
})

export class PagesScrollCardsComponent implements OnInit {
  @Input() requestData: any;
  @Input() showMeta: boolean;

  constructor() {

  }

  ngOnInit() {

  }
}
