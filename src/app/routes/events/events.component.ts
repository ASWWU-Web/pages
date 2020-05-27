import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: any;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.requestService.get('/pages/search?category=Event', (data) => {
      this.events = data.results.reverse();
    });
  }
}
