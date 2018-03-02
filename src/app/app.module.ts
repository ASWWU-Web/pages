import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import { PageComponent, EditComponent, RevisionsComponent, SearchComponent } from './routes/routes';
import {
  ProfileSmComponent,
  NavBarComponent,
  UserBubbleComponent,
  SubNavBarComponent,
  MobileNavComponent,
  UnescapePipe,
  BypassSecurityPipe,
  PageResultsComponent
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
    SearchComponent,
    PageResultsComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        "path": "admin/edit/:pageURL/revisions",
        component: RevisionsComponent
      },{
        "path": "admin/edit/:pageURL",
        component: EditComponent
      },{
        "path": 'search',
        component: SearchComponent
      },{
        "path": ':pageURL',
        component: PageComponent
      }
    ])

  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
