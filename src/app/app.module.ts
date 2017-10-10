import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventService } from './event.service';
import { BookCategoryService } from "./bookcategory.service";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpModule
  ],
  providers: [EventService,BookCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
