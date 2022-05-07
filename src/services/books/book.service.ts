import { Injectable } from '@angular/core';
import { BOOKS } from './mock-books';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { Book } from './book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private messageService: MessageService) {}

  getBooks(): Observable<Book[]> {
    const books = of(BOOKS);
    this.messageService.add('BooksService: fetched books');
    return books;
  }
}
