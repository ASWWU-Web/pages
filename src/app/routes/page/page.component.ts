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
      this.request.get( ('/pages/' + params.pageURL), (data) => this.page = data, (error) => {
        this.page = {
          'title': 'Something went wrong',
          'content': '<h3> There was a problem getting that page for you 🤷 </h3> ' + error.message,
        };
      } );
    });
  }

  ngOnInit() { }

  loadContent() {
    document.getElementById('content').innerHTML = this.page.content;
    return null;
  }

}
