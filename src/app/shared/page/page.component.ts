import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

import { ViewPageComponent } from '../../routes/routes';
import { BypassSecurityPipe } from '../bypassSecurityPipe';
import { RequestService } from '../../RequestService/requests';
import { CURRENT_YEAR, MEDIA_XS, MEDIA_LG, MEDIA_MD, MEDIA_URI } from '../../config';
import { resolveCoverImage } from '../resolveCoverImage';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnChanges {
  @Input() requestURL: string;

  getCoverImage: any = resolveCoverImage;
  coverImage: any;
  page: any;
  continue = true;
  owner = {
    'full_name': 'ASWWU',
    'photo': 'images/mask_unknown.png',
    'email': 'aswwu.webmaster@wallawalla.edu',
  };
  media_sm = MEDIA_XS;
  media_lg = MEDIA_LG;
  media_md = MEDIA_MD;
  media_uri = MEDIA_URI;
  MASK = 'https://aswwu.com/#/profile';
  isEditor = false;
  pageProfile: string;
  errorPage = false;

  constructor( private request: RequestService, private router: Router ) {
  }

  ngOnChanges() {
    this.request.get( (this.requestURL), (data) => {
      this.page = data;
      this.continue = true;
      this.coverImage = resolveCoverImage(this.page.cover_image, this.media_lg);
      this.setIsEditor();
      this.setPageProfile();
    }, (error) => {
      this.page = {
        'title': 'Something went wrong',
        'content': '<h3> There was a problem getting that page for you 🤷 </h3> ' + error.message,
      };
      this.errorPage = true;
    });
  }

  goToEdit() {
    this.router.navigate(['admin/edit', this.page.url]);
  }

  setIsEditor() {
    this.request.verify( (data) => this.isEditor = this.page.editors.includes(data.username) || (this.page.owner === data.username));
  }

  setPageProfile () {
    if (this.page.author) {
      this.pageProfile = this.page.author;
    } else {
      this.pageProfile = this.page.owner;
    }
  }
}
