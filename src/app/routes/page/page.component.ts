import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../RequestService/requests';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: any;

  constructor( private request: RequestService, private route: ActivatedRoute ) {
    this.route.params.subscribe( params => {
      this.request.get( ('/pages/' + params.pageURL), (data) => this.page = data, null );
    });
  }

  ngOnInit() { }

  loadContent() {
    document.getElementById('content').innerHTML = this.page.content;
    return null;
  }

}
