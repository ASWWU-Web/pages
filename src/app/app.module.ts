import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed for TagInputModule

import { TagInputModule } from 'ngx-chips';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import {
  PageComponent,
  EditComponent,
  RevisionsComponent,
  AdminComponent,
  AdminCreateComponent,
  DirectoryComponent,
  SearchComponent,
  DepartmentsComponent,
  EventsComponent,
  CollegianComponent
} from './routes/routes';
import {
  ProfileSmComponent,
  NavBarComponent,
  UserBubbleComponent,
  SubNavBarComponent,
  MobileNavComponent,
  UnescapePipe,
  BypassSecurityPipe,
  PageScrollCardsComponent,
  FieldScrollCardsComponent,
  PageResultsComponent,
  PageCardComponent,
  FieldResultsComponent
} from './shared/shared';



@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    EditComponent,
    RevisionsComponent,
    ProfileSmComponent,
    NavBarComponent,
    UserBubbleComponent,
    SubNavBarComponent,
    MobileNavComponent,
    UnescapePipe,
    BypassSecurityPipe,
    DirectoryComponent,
    PageScrollCardsComponent,
    FieldScrollCardsComponent,
    PageCardComponent,
    AdminComponent,
    AdminCreateComponent,
    SearchComponent,
    PageResultsComponent,
    DepartmentsComponent,
    FieldResultsComponent,
    EventsComponent,
    CollegianComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    TagInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        // MUST BE FIRST
        'path': 'admin',
        component: AdminComponent
      }, {
        'path': 'admin/edit/:pageURL',
        component: EditComponent
      }, {
        'path': 'admin/create',
        component: AdminCreateComponent
      }, {
        'path': 'admin/edit/:pageURL/revisions',
        component: RevisionsComponent
      }, {
        "path": 'search',
        component: SearchComponent
      }, {
        "path": 'search:queryComponent',
        component: SearchComponent
      }, {
        "path": 'departments',
        component: DepartmentsComponent
      }, {
        "path": 'events',
        component: EventsComponent
      }, {
        "path": 'collegian',
        component: CollegianComponent
      }, {
        // MUST BE LAST
        'path': ':pageURL',
        component: PageComponent
      }, {
        "path": '',
        component: DirectoryComponent
      }
    ])

  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
