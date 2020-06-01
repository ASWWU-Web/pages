import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed for TagInputModule
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { TagInputModule } from 'ngx-chips';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// shared-ng components
import {
  NavBarComponent,
  FooterComponent,
  HeaderComponent,
  UserBubbleComponent,
  SharedNgContainerComponent,
  ErrorPageComponent,
} from '../shared-ng/components/components';

// shared-ng services
import {
  RequestService,
  HermesService,
  PagesRequestService,
  AuthService
} from '../shared-ng/services/services';

import { AppComponent } from './app.component';

import {
  ViewPageComponent,
  EditComponent,
  RevisionsComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminViewComponent,
  DirectoryComponent,
  SearchComponent,
  DepartmentsComponent,
  EventsComponent,
  CollegianComponent
} from './routes/routes';

import {
  PageComponent,
  ProfileSmComponent,
  SubNavBarComponent,
  MobileNavComponent,
  UnescapePipe,
  BypassSecurityPipe,
  PageScrollCardsComponent,
  FieldScrollCardsComponent,
  PageResultsComponent,
  PageCardComponent,
  FieldResultsComponent,
  FieldCardComponent,
  ProfileInfoComponent
} from './shared/shared';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    UserBubbleComponent,
    SharedNgContainerComponent,
    ErrorPageComponent,
    PageComponent,
    EditComponent,
    RevisionsComponent,
    ProfileSmComponent,
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
    AdminViewComponent,
    SearchComponent,
    PageResultsComponent,
    DepartmentsComponent,
    FieldResultsComponent,
    EventsComponent,
    CollegianComponent,
    ViewPageComponent,
    FieldCardComponent,
    ProfileInfoComponent
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
        'path': 'admin/:pageURL',
        component: AdminViewComponent
      }, {
        'path': 'search',
        component: SearchComponent
      }, {
        'path': 'search:queryComponent',
        component: SearchComponent
      }, {
        'path': 'departments',
        component: DepartmentsComponent
      }, {
        'path': 'events',
        component: EventsComponent
      }, {
        'path': 'collegian',
        component: CollegianComponent
      }, {
        // MUST BE LAST
        'path': ':pageURL',
        component: ViewPageComponent
      }, {
        'path': '',
        component: DirectoryComponent
      }
    ])

  ],
  providers: [
    RequestService,
    HermesService,
    AuthService,
    PagesRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faSearch);
  }
 }
