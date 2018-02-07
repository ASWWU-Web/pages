import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
