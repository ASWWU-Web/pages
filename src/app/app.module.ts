import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';
import { PageComponent, AdminComponent, AdminCreateComponent } from './routes/routes';
import { ProfileSmComponent, NavBarComponent, UserBubbleComponent, SubNavBarComponent, MobileNavComponent, UnescapePipe, BypassSecurityPipe } from './shared/shared';



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
    BypassSecurityPipe,
    AdminComponent,
    AdminCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {
        'path': 'page',
        component: PageComponent
      },
      {
        'path': 'admin',
        component: AdminComponent
      },
      {
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
