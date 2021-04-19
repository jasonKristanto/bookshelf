const {
  sendSuccessResponse,
  sendFailedResponse,
} = require('../../helpers/responseHelpers');
const books = require('../../model/books');
const bookRequest = require('../../requests/bookRequest');

module.exports = {
  updateBookService: (request, h) => {
    try {
      const {bookId} = request.params;
      const index = books.findIndex((book) => book.id === bookId);

      if (index === -1) {
        return sendFailedResponse(h, 400,
            'Gagal memperbarui catatan. Id tidak ditemukan',
        );
      }

      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = request.payload;

      if (name.length <= 0 || typeof name !== 'string') {
        return sendFailedResponse(h, 400,
            'Gagal menambahkan buku. Mohon isi nama buku',
        );
      }

      if (readPage > pageCount) {
        return sendFailedResponse(h, 400,
            'Gagal menambahkan buku. ' +
            'readPage tidak boleh lebih besar dari pageCount',
        );
      }

      if (bookRequest.validate(request.payload)) {
        const isBookNameUnique = books.filter(
            (book) => book.name.toLowerCase() === name.toLowerCase(),
        ).length === 0 || books[index].name === name;

        if (isBookNameUnique) {
          books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt: new Date().toISOString(),
            finished: pageCount === readPage,
          };

          return sendSuccessResponse(h, 'Buku berhasil diperbarui');
        }

        return sendFailedResponse(h, 400,
            'Gagal memperbarui buku. Judul buku sudah terdaftar sebelumnya.',
        );
      }

      return sendFailedResponse(h, 500,
          'Gagal memperbarui buku. Mohon kirimkan request yang sesuai.',
      );
    } catch (err) {
      return sendFailedResponse(h, 500,
          'Gagal memperbarui buku.',
      );
    }
  },
};
