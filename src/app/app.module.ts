import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { CharacterListingScreenComponent } from './character-listing-screen/character-listing-screen.component';
import { CharacterDetailScreenComponent } from './character-detail-screen/character-detail-screen.component';
import { HttpClientModule } from '@angular/common/http'
import { SWAPIService } from './swapi.service';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { CharacterNameRendererComponent } from './character-name-renderer/character-name-renderer.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { SpeciesRendererComponent } from './species-renderer/species-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    CharacterListingScreenComponent,
    CharacterDetailScreenComponent,
    CharacterNameRendererComponent,
    FilmCardComponent,
    SpeciesRendererComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [SWAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
