import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  admin: any;

  constructor( private request: RequestService ) {
    this.request.get( ('/pages/admin'), (data) => {
      this.admin = data;
      console.log(this.admin);
    }, null );
  }

  ngOnInit() {
  }

}
