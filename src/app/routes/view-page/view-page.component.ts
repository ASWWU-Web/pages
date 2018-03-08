import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  pageURL: string;

  constructor( private route: ActivatedRoute ) {
    this.route.params.subscribe( (params) => this.pageURL = params.pageURL );

   }

  ngOnInit() {
  }

}
