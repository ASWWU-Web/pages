import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin: any = [];

  constructor( private request: RequestService ) {  }

  ngOnInit() {
    this.request.get( ('/pages/admin'), (data) => this.admin = data.results, null );
   }

  shorten( text: string ) {
    if (text) {
      if (text.length > 20) {
        return text.slice(0, 20) + '...';
      } else {
        return text;
      }
    } else {
      return '';
    }
  }

}
