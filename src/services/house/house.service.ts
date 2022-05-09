import { Injectable } from '@angular/core';
import { House } from './house';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private housesUrl = 'https://www.anapioficeandfire.com/api/houses';
  private pageSize = 50;
  private totalPages = 43;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHouses(pageNumber: number): Observable<House[]> {
    const url = `${this.housesUrl}?page=${pageNumber || 1}&pageSize=${
      this.pageSize
    }`;
    return this.http.get<House[]>(url).pipe(
      tap((_) => this.log('fetched houses')),
      map((houses) => {
        const housesWithId = houses.map((house, index) => {
          const id = house.url.split('/').pop() || `${index}`;
          return { ...house, id };
        });

        return housesWithId;
      }),
      catchError(this.handleError<House[]>('getHouses', []))
    );
  }
  getHouse(id: number): Observable<House> {
    const url = `${this.housesUrl}/${id}`;
    return this.http.get<House>(url).pipe(
      tap((_) => this.log(`fetched house id=${id}`)),
      map((house, index) => {
        const id = house.url.split('/').pop() || `${index}`;
        return { ...house, id };
      }),
      catchError(this.handleError<House>(`getHouse id=${id}`))
    );
  }

  searchHouses(term: string): Observable<House[]> {
    if (!term.trim()) {
      // if not search term, return empty house array.
      return of([]);
    }
    return this.http.get<House[]>(`${this.housesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found houses matching "${term}"`)
          : this.log(`no houses matching "${term}"`)
      ),
      map((houses) => {
        const housesWithId = houses.map((house, index) => {
          const id = house.url.split('/').pop() || `${index}`;
          return { ...house, id };
        });

        return housesWithId;
      }),
      catchError(this.handleError<House[]>('searchHouses', []))
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
    this.messageService.add(`HouseService: ${message}`);
  }
}
