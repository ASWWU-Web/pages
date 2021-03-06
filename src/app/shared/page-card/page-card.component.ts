import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../../shared-ng/services/request.service';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';
import { resolveCoverImage } from '../../shared/resolveCoverImage'

@Component({
  selector: 'page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.css']
})

export class PageCardComponent implements OnInit {
  @Input() page: any;
  @Input() showMeta = false;
  profile: any;
  router: any;
  public getCoverImage: any = resolveCoverImage;

  constructor(private rs: RequestService, private _router: Router) {
      this.router = _router;
  }

  ngOnInit() {
    if (this.showMeta) {
      this.rs.get('/profile/' + CURRENT_YEAR + '/' + this.page['author']).subscribe((data) => {
        this.profile = data;
      });
    }
  }

  // Photourl to link function returns proper url and BLANK photo if photo == 'None'
  getPhotoLink(url: string) {
    if (url && url !== 'None') {
        return MEDIA_SM + '/' + url;
    } else {
        return MEDIA_SM + '/' + DEFAULT_PHOTO;
    }
  }

  getAuthor() {
    try {
      if (this.profile['full_name'] != null) {
        return this.profile['full_name'];
      } else {
        const author = this.page['author'].replace(/\./gi, ' ');
        // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
        return author.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    } catch (err) {
      return '';
    }
  }

  authorProfile() {
    return 'https://aswwu.com/#/profile/' + this.page['author'];
  }

  getDateCreated() {
    const date = new Date(this.page['created']);
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  navigate(url) {
    // wait to navigate if author link was clicked
    setTimeout(() => {this.router.navigate(['/' + url]); }, 150);
  }

  // this function is to remedy a bug in Angular. Do not alter or remove.
  getShowMeta() {
    if (this.showMeta === true) {
      return true;
    }
    return false;
  }
}
