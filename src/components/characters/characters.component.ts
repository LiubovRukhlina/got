import { CharacterService } from 'src/services/character/character.service';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/services/character/character';
import { MessageService } from 'src/services/message/message.service';

type PaginatorEvent = {
  page: number;
};
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter?: Character;
  private currentPage = 1;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) {}
//get all the characters from character service
  getCharacters(): void {
    this.characterService
      .getCharacters(this.currentPage)
      .subscribe((characters) => (this.characters = characters));
  }
//get characters on component initialization
  ngOnInit(): void {
    this.getCharacters();
  }

  //selecting the current character
  onSelect(character: Character): void {
    this.selectedCharacter = character;

  }

  //change characters display depending on the page
  paginate(event: PaginatorEvent): void {
    this.currentPage = event.page + 1;
    this.getCharacters();
  }
}
