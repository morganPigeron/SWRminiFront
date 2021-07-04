import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarMapComponent } from './star-map/star-map.component';
import { SectorMapComponent } from './star-map/sector-map/sector-map.component';

@NgModule({
  declarations: [
    AppComponent,
    StarMapComponent,
    SectorMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
