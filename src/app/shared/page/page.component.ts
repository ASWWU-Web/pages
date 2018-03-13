import { Component, OnChanges, Input } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

import { ViewPageComponent } from '../../routes/routes';
import { CURRENT_YEAR, MEDIA_XS } from '../../config';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnChanges {
  @Input() requestURL: string;

  page: any;
  continue = true;
  owner: any;
  MEDIA_XS = MEDIA_XS;

  constructor( private request: RequestService ) {
  }

  ngOnChanges() {
    this.request.get( (this.requestURL), (data) => {
      this.page = data;
      this.continue = true;
    }, (error) => {
      this.page = {
        'title': 'Something went wrong',
        'content': '<h3> There was a problem getting that page for you 🤷 </h3> ' + error.message,
      };
    });
  }

  loadContent() {
    if (this.continue) {
      document.getElementById('content').innerHTML = this.page.content;
      this.continue = false;
      this.request.get( ('/profile/' + CURRENT_YEAR + '/' + this.page.owner), (data) => this.owner = data, null );
    }
    return null;
  }

}
