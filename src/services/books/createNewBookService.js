const {nanoid} = require('nanoid');

const {
  sendSuccessResponse,
  sendFailedResponse,
} = require('../../helpers/responseHelpers');
const books = require('../../model/books');
const bookRequest = require('../../requests/bookRequest');

module.exports = {
  createNewBookService: (request, h) => {
    try {
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

      if (name === undefined || name.length <= 0 || typeof name !== 'string') {
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
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const isIdUnique = books.filter((book) => book.id === id).length === 0;

        if (isIdUnique) {
          books.push({
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            insertedAt,
            updatedAt,
            finished: pageCount === readPage,
          });

          return sendSuccessResponse(h, 'Buku berhasil ditambahkan', 201, {
            bookId: id,
          });
        }

        return sendFailedResponse(h, 400,
            'Buku gagal ditambahkan. Judul buku sudah terdaftar sebelumnya.',
        );
      }

      return sendFailedResponse(h, 500,
          'Buku gagal ditambahkan. Mohon kirimkan request yang sesuai.',
      );
    } catch (err) {
      return sendFailedResponse(h, 500,
          'Buku gagal ditambahkan',
      );
    }
  },
};
