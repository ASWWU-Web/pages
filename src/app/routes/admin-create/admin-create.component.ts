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

  urlIsEdited = false;
  regex = /[^a-z0-9-]/g;
  urlInvalid = false;

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
    if (!this.urlIsEdited) {
      // GC -- I'm removing ```(this.newPage.title !== undefined) && ``` check since this is run on a keyup,
      // GC -- so title would never be undefined when this code runs.
      const titleBasedUrl = this.newPage.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''); // .replace(regex)
      this.newPage.url = titleBasedUrl;
      this.urlCheck();
      // GC -- this use of urlCheck() is just a double check and isn't necessary.
    }
  }

  urlEdit() {
    this.urlIsEdited = true;
    // GC -- Ryan: is it bad to have this set urlIsEdited on every keyup?
    // GC -- I'm not sure how I'd do it on just the first keyup and it seems spammy to do it on every single one.
    this.urlCheck();
  }

  urlCheck() {
    this.urlInvalid = this.regex.test(this.newPage.url);
  }

  ngOnInit() {
    this.request.get( ('/pages/category'), (data) => this.categories = data.categories, (error) => console.log(error) );
    this.request.get( ('/pages/department'), (data) => this.departments = data.departments, (error) => console.log(error) );
  }

}
