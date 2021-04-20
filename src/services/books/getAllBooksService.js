const books = require('../../model/books');
const {sendSuccessResponse} = require('../../helpers/responseHelpers');

module.exports = {
  getAllBooksService: (request, h) => {
    let nameQuery = null;
    let readingQuery = null;
    let finishedQuery = null;

    if ('name' in request.query) {
      nameQuery = request.query.name.toLowerCase();
    } else if ('reading' in request.query) {
      if (request.query.reading === '1') {
        readingQuery = true;
      } else if (request.query.reading === '0') {
        readingQuery = false;
      } else {
        readingQuery = null;
      }
    } else if ('finished' in request.query) {
      if (request.query.finished === '1') {
        finishedQuery = true;
      } else if (request.query.finished === '0') {
        finishedQuery = false;
      } else {
        finishedQuery = null;
      }
    }

    const newBooks = [];
    books.forEach((book, index) => {
      let condition = true;

      if (nameQuery !== null) {
        condition = book.name.toLowerCase().includes(nameQuery);
      } else if (readingQuery !== null) {
        condition = readingQuery === book.reading;
      } else if (finishedQuery !== null) {
        condition = finishedQuery === book.finished;
      }

      if (condition) {
        newBooks.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        });
      }
    });

    return sendSuccessResponse(h, 'Semua buku berhasil ditemukan.', 200, {
      books: newBooks,
    });
  },
};
