import { BookService } from 'src/services/books/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/services/books/book';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}
//get books on initialization
  ngOnInit(): void {
    this.getBooks();
  }
//get and update book list from book service subscribtion
  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }
}
