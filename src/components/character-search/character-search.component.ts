import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Character } from 'src/services/character/character';
import { CharacterService } from 'src/services/character/character.service';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css'],
})
export class CharacterSearchComponent implements OnInit {
  characters$!: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.characters$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.characterService.searchCharacters(term))
    );
  }
}
