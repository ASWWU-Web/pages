import { Component, OnInit, NgModule } from '@angular/core';
import { RequestService } from '../../RequestService/requests';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  // form contains:
  // url: string,
  // title: string,
  // category: string,
  // department: string,
  // current: boolean

  newPage: any = {};

  constructor( private request: RequestService ) {  }

  onSubmit() {
    this.request.post( ('/pages/admin'), this.newPage, (data) => alert(data.status), (error) => alert(error) );
  }

  ngOnInit() {
  }

}
