import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { RequestService } from '../../RequestService/requests';
import { CURRENT_YEAR, MEDIA_XS } from '../../config';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnChanges {
  @Input() profileUserName: string;
  @Input() showPhoto: boolean;
  @Input() showEmail: boolean;
  @Input() fields: string[];
  profileData: any;
  MEDIA_XS = MEDIA_XS; // ?
  MASK = 'https://aswwu.com/#/profile';

  constructor( private request: RequestService ) { }

  ngOnChanges () {
    this.request.get( ('/profile/' + CURRENT_YEAR + '/' + this.profileUserName), (data) => {
      this.profileData = data;
      if (this.profileData.error === 'no profile found') {
        this.profileData = null;
      }
      if (this.profileData.photo === 'None') {
        this.showPhoto = false;
      }
      if (this.profileData.email === 'None') {
        this.showEmail = false;
      }
      if (this.profileData.full_name === 'None') {
        this.profileData.full_name = this.profileData.username.replace(/\./g, ' ');
      }
    }, null );
  }

}
