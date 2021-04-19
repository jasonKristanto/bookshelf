const books = require('../../model/books');
const {sendSuccessResponse} = require('../../helpers/responseHelpers');

module.exports = {
  getAllBooksService: (request, h) => {
    const newBooks = [];
    books.forEach((book, index) => {
      newBooks.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      });
    });

    return sendSuccessResponse(h, 'Semua buku berhasil ditemukan.', 200, {
      books: newBooks,
    });
  },
};
