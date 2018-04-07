import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Page1Component } from './pages/page1/page1.component';
import { VDraggerComponent } from './components/v-dragger/v-dragger.component';
import { Page2Component } from './pages/page2/page2.component';
import { DropSelectComponent } from './components/drop-select/drop-select.component';


@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    VDraggerComponent,
    Page2Component,
    DropSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
