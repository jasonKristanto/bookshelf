const books = require('../../model/books');
const {
  sendSuccessResponse,
  sendFailedResponse,
} = require('../../helpers/responseHelpers');

module.exports = {
  deleteBookService: (request, h) => {
    const {bookId} = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books.splice(index, 1);
      return sendSuccessResponse(h, 'Buku berhasil dihapus', 200);
    }

    return sendFailedResponse(h, 404, 'Buku gagal dihapus. Id tidak ditemukan');
  },
};
