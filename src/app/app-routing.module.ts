import { HousesComponent } from 'src/components/houses/houses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from '../components/characters/characters.component';
import { BooksComponent } from 'src/components/books/books.component';
import { CharacterDetailComponent } from 'src/components/character-detail/character-detail.component';
import { BookDetailComponent } from 'src/components/book-detail/book-detail.component';
import { HouseDetailComponent } from 'src/components/house-detail/house-detail.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'books', component: BooksComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'characters/:name', component: CharacterDetailComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
