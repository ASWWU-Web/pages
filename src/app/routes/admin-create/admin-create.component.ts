import { Component, OnInit, NgModule } from '@angular/core';
import { RequestService } from '../../RequestService/requests';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  newPage: any = {};
  categories: any;
  departments: any;

  constructor( private request: RequestService, private router: Router ) {  }

  onSubmit() {
    this.request.post( ('/pages/admin'), this.newPage,
      (data) => {
        if ( data.status !== undefined ) {
          if (data.status === 'page created') {
            this.router.navigate(['admin/edit' , this.newPage.url ]);
          } else {
            alert(data.status);
          }
        } else {
          alert( 'Unable to connect' );
        }
      },
      (error) => {
        console.log(error);
          if (error.status === 409) {
            alert( 'The URL you\'ve selected is already in use' );
          } else {
            alert( error.message + '\n' + error.statusText );
          }
      }
    );
  }

  titleEdit () {
    if (this.newPage.title !== undefined) {
      const titleBasedUrl = this.newPage.title.toLowerCase().replace(/ /g, '-'); // .replace(regex)
      this.newPage.url = titleBasedUrl;
    }
  }

  ngOnInit() {
    this.request.get( ('/pages/category'), (data) => this.categories = data.categories, (error) => console.log(error) );
    this.request.get( ('/pages/department'), (data) => this.departments = data.departments, (error) => console.log(error) );
  }

}
