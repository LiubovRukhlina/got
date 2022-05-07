import { Injectable } from '@angular/core';
import { Character } from './character';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private charactersUrl =
    'https://www.anapioficeandfire.com/api/characters?page=2&pageSize=100';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersUrl).pipe(
      tap((_) => this.log('fetched characters')),
      catchError(this.handleError<Character[]>('getCharacters', []))
    );
  }
  getCharacter(id: number): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      tap((_) => this.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Character[]>(`${this.charactersUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found characters matching "${term}"`)
            : this.log(`no characters matching "${term}"`)
        ),
        catchError(this.handleError<Character[]>('searchCharacters', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }
}
