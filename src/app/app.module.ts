import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from '../components/characters/characters.component';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from '../components/character-detail/character-detail.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { BooksComponent } from '../components/books/books.component'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { CharacterSearchComponent } from '../components/character-search/character-search.component';
import { HousesComponent } from '../components/houses/houses.component';
import { HouseDetailComponent } from 'src/components/house-detail/house-detail.component';
import { BookDetailComponent } from 'src/components/book-detail/book-detail.component';
import { HouseSearchComponent } from 'src/components/house-search/house-search.component';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    MessagesComponent,
    BooksComponent,
    CharacterSearchComponent,
    HousesComponent,
    HouseDetailComponent,
    BookDetailComponent,
    HouseSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginatorModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
