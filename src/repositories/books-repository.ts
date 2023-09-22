import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database/index";

import connection from "../database";

export async function getBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany();
  return books;
}

export async function getBook(id: number): Promise<Book> {
  const book = await prisma.book.findUnique({
    where : { id }
  })
  return book;
}

export async function createBook(book: CreateBook) {
  return await prisma.book.create({
    data : book
  });
}

export async function reviewBook(bookReview: CreateReview) {
  return await prisma.book.update({
    where: {
      id: bookReview.bookId
    },
    data: {
      grade: bookReview.grade,
      review: bookReview.review,
      read: true
    }
  })

  // const { bookId, grade, review } = bookReview;
  // const query = `
  //   UPDATE books 
  //   SET
  //     grade = $1,
  //     review = $2,
  //     read = true 
  //   WHERE id = $3
  // `;

  // const result = await connection.query(query, [grade, review, bookId]);
  // return result.rowCount;
}