import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {​​ FormsModule, ReactiveFormsModule }​​ from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LipsComponent } from './products/lips/lips.component';
import { EyesComponent } from './products/eyes/eyes.component';
import { FaceComponent } from './products/face/face.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EyesComponent,
    FaceComponent,
    LipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
