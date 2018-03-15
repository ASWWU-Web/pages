import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ViewPageComponent } from '../../routes/routes';
import { RequestService } from '../../RequestService/requests';
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
  owner = {
    'full_name': 'ASWWU',
    'photo': 'images/mask_unknown.png',
    'email': 'aswwu.webmaster@wallawalla.edu',
  };
  MEDIA = MEDIA_XS;
  isEditor = false;

  constructor( private request: RequestService, private router: Router ) {
  }

  ngOnChanges() {
    this.request.get( (this.requestURL), (data) => {
      this.page = data;
      this.continue = true;
      this.setIsEditor();
    }, (error) => {
      this.page = {
        'title': 'Something went wrong',
        'content': '<h3> There was a problem getting that page for you 🤷 </h3> ' + error.message,
        'owner': 'error',
      };
    });
  }

  loadContent() {
    if (this.continue) {
      document.getElementById('content').innerHTML = this.page.content;
      this.continue = false;
      if ( this.page.owner !== 'error') {
        this.request.get( ('/profile/' + CURRENT_YEAR + '/' + this.page.owner), (data) => this.owner = data, (error) => {
          this.owner = {
            'full_name': this.page.owner.replace(/./g, ' '),
            'photo': 'images/mask_unknown.png',
            'email': 'aswwu.webmaster@wallawalla.edu',
          };
        } );
      } else {
        this.owner = {
          'full_name': 'The ASWWU Web Team',
          'photo': 'images/mask_unknown.png',
          'email': 'aswwu.webmaster@wallawalla.edu',
        };
      }
    }
    return null;
  }

  goToEdit() {
    this.router.navigate(['admin/edit', this.page.url]);
  }

  setIsEditor() {
    this.request.verify( (data) => this.isEditor = this.page.editors.includes(data.username) || (this.page.owner === data.username));
  }

}
