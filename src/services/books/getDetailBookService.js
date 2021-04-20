const books = require('../../model/books');
const {
  sendSuccessResponse,
  sendFailedResponse,
} = require('../../helpers/responseHelpers');

module.exports = {
  getDetailBookService: (request, h) => {
    const {bookId} = request.params;
    const book = books.filter((book) => book.id === bookId)[0];

    if (book !== undefined) {
      return sendSuccessResponse(h, 'Buku berhasil ditemukan', 200, {
        book,
      });
    }

    return sendFailedResponse(h, 404, 'Buku tidak ditemukan');
  },
};
