import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import { PageComponent, EditComponent, RevisionsComponent, AdminComponent, AdminCreateComponent } from './routes/routes';
import {
  ProfileSmComponent,
  NavBarComponent,
  UserBubbleComponent,
  SubNavBarComponent,
  MobileNavComponent,
  UnescapePipe,
  BypassSecurityPipe
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
    AdminComponent,
    AdminCreateComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {
        'path': 'page',
        component: PageComponent
      }, {
        'path': 'admin/edit/:pageURL/revisions',
        component: RevisionsComponent
      }, {
        'path': 'admin/edit/:pageURL',
        component: EditComponent
      }, {
        'path': ':pageURL',
        component: PageComponent
      }, {
        'path': 'admin',
        component: AdminComponent
      }, {
        'path': 'admin/create',
        component: AdminCreateComponent
      }
    ])

  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
