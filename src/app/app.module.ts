import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import { PageComponent } from './routes/routes';
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
    ProfileSmComponent,
    NavBarComponent,
    UserBubbleComponent,
    SubNavBarComponent,
    MobileNavComponent,
    UnescapePipe,
    BypassSecurityPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        'path': 'page',
        component: PageComponent
      },
      {
        'path': 'page/:pageURL',
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
