import { Character } from '../../services/character/character';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/services/character/character.service';
import {HouseService} from "../../services/house/house.service";
import {BookService} from "../../services/books/book.service";
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  @Input() character?: Character | undefined;
  characterId?: number;
  father?: string;
  mother?: string;
  spouse?: string;
  allegianceList: { [id: number]: string } = {}
  bookList:{ [id: number]: string } = {}
  povBookList:{ [id: number]: string } = {}
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private houseService: HouseService,
    private bookService: BookService,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.characterId= Number(params['id']);
      this.getCharacter()
    })
  }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {

    this.characterId && this.characterService
      .getCharacter(this.characterId)
      .subscribe((character) => {this.character = character;
    this.getFather();
    this.getMother();
    this.getSpouse();
    this.getAllegiances();
    this.getBooks();
    this.getPovBooks();
      });

  }
  goBack(): void {
    this.location.back();
  }

  getFather(): void {
    const fatherId = Number(this.character?.father.split('/').pop());
    this.characterService
      .getCharacter(fatherId)
      .subscribe((character) => {
        this.father = character.name
      });
  }

  getMother(): void {
    const motherId = Number(this.character?.mother.split('/').pop());
    this.characterService
      .getCharacter(motherId)
      .subscribe((character) => {
        this.mother = character.name
      });
  }
  getSpouse(): void {
    const spouseId = Number(this.character?.spouse.split('/').pop());
    this.characterService
      .getCharacter(spouseId)
      .subscribe((character) => {
        this.spouse = character.name
      });
  }

  getAllegiances() {
    this.character?.allegiances.map((allegianceUrl) => {
      const allegianceId = Number(allegianceUrl.split('/').pop());

      this.houseService
        .getHouse(allegianceId)
        .subscribe((house) => {
          this.allegianceList[allegianceId] = house.name
        });
    })
  }

  getBooks() {
    this.character?.books.map((bookUrl) => {
      const bookId = Number(bookUrl.split('/').pop());

      this.bookService
        .getBook(bookId)
        .subscribe((book) => {
          this.bookList[bookId] = book.name
        });
    })
  }
  getPovBooks() {
    this.character?.povBooks.map((bookUrl) => {
      const bookId = Number(bookUrl.split('/').pop());

      this.bookService
        .getBook(bookId)
        .subscribe((book) => {
          this.povBookList[bookId] = book.name
        });
    })
  }
}
