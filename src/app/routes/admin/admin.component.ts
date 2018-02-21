import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin: any;

  constructor( private request: RequestService ) {
    this.request.get( ('/pages/admin'), (data) => {
      this.admin = data.results;
      console.log(this.admin);
    }, (error) => alert('Something went wrong: \n' + error.message) );
  }

  ngOnInit() {
  }

}
