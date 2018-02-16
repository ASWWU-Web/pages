import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import { PageComponent, EditComponent } from './routes/routes';
import { ProfileSmComponent, NavBarComponent, UserBubbleComponent, SubNavBarComponent, MobileNavComponent, UnescapePipe, BypassSecurityPipe } from './shared/shared';



@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    EditComponent,
    ProfileSmComponent,
    NavBarComponent,
    UserBubbleComponent,
    SubNavBarComponent,
    MobileNavComponent,
    UnescapePipe,
    BypassSecurityPipe,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        "path": 'page/:url',
        component: PageComponent
      },{
        "path": "admin/edit/:url",
        component: EditComponent
      },
    ])

  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
