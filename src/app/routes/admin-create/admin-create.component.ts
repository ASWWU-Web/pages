import { Component, OnInit, NgModule } from '@angular/core';
import { RequestService } from '../../RequestService/requests';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  newPage: any = {};
  categories: any;
  departments: any;

  constructor( private request: RequestService ) {  }

  onSubmit() {
    this.request.post( ('/pages/admin'), this.newPage,
      // (data) => alert(data.message),
      (data) => alert((data.status !== undefined) ? data.status : 'Unable to connect'),
      (error) => alert((error.error.status !== undefined) ? error.error.status : 'Unable to connect')
    );
  }

  ngOnInit() {
    this.request.get( ('/pages/category'), (data) => this.categories = data.categories, (error) => console.log(error) );
    this.request.get( ('/pages/department'), (data) => this.departments = data.departments, (error) => console.log(error) );
  }

}
