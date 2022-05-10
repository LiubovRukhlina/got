import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/services/books/book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/services/books/book.service';
import {CharacterService} from "../../services/character/character.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input() book?: Book;
  bookId?: number
  characterList: { [id: number]: string } = {}
  povCharacterList: { [id: number]: string } = {}

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private characterService: CharacterService,
    private location: Location

  ) {
    this.route.params.subscribe(params => {
      this.bookId= Number(params['id']);
      this.getBook()
    })
  }

  ngOnInit(): void {
    this.getBook();
  }
  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe((book) => {(this.book = book)
    this.getCharacters();
    this.getPovCharacters();
    });
  }
  goBack(): void {
    this.location.back();
  }

  getCharacters() {
    this.book?.characters.map((characterUrl) => {
      const characterId = Number(characterUrl.split('/').pop());

      this.characterService
        .getCharacter(characterId)
        .subscribe((character) => {
          this.characterList[characterId] = character.name
        });
    })
  }

  getPovCharacters() {
    this.book?.povCharacters.map((characterUrl) => {
      const characterId = Number(characterUrl.split('/').pop());

      this.characterService
        .getCharacter(characterId)
        .subscribe((character) => {
          this.povCharacterList[characterId] = character.name
        });
    })
  }
}
