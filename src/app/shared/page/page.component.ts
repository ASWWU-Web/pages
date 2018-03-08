import { Component, OnChanges, Input } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

import { ViewPageComponent } from '../../routes/routes';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnChanges {
  @Input() requestURL: string;

  page: any;

  constructor( private request: RequestService ) {
  }

  ngOnChanges() {
    console.log(this.requestURL);
    this.request.get( (this.requestURL), (data) => this.page = data, (error) => {
      this.page = {
        'title': 'Something went wrong',
        'content': '<h3> There was a problem getting that page for you 🤷 </h3> ' + error.message,
      };
    });
  }

  loadContent() {
    document.getElementById('content').innerHTML = this.page.content;
    return null;
  }

}
