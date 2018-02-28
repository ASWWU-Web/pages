import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'scroll-cards',
  templateUrl: './scroll-cards.component.html',
  styleUrls: ['./scroll-cards.component.css']
})

export class ScrollCardsComponent implements OnInit {
  @Input() scrollType: string;
  @Input() requestData: any;

  constructor() {

  }

  ngOnInit() {

  }
}
