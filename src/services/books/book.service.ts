import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl = 'https://anapioficeandfire.com/api/books/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap((_) => this.log('fetched books')),
      map((books) => {
        const booksWithId = books.map((book, index) => {
          const id = book.url.split('/').pop() || `${index}`;
          return { ...book, id };
        });

        return booksWithId;
      }),
      catchError(this.handleError<Book[]>('getCharacters', []))
    );
  }
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap((_) => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getHero id=${id}`))
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
    this.messageService.add(`BookService: ${message}`);
  }
}
