import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import connection from "../database";

export async function getBooks() {
  const query = `SELECT * FROM books`;
  const result = await connection.query<Book>(query);
  return result.rows;
}

export async function getBook(id: number) {
  const query = `SELECT * FROM books WHERE id = $1`;
  const result = await connection.query<Book>(query, [id]);
  return result.rows[0];
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const query = `
    INSERT INTO books (title, author, publisher, "purchaseDate")
    VALUES ($1, $2, $3, $4)`;

  const result = await connection.query(query, [
    title, author, publisher, purchaseDate
  ]);

  return result.rowCount;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const query = `
    UPDATE books 
    SET
      grade = $1,
      review = $2,
      read = true 
    WHERE id = $3
  `;

  const result = await connection.query(query, [grade, review, bookId]);
  return result.rowCount;
}