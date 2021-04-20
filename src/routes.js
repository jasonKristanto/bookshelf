const {
  bookServices,
} = require('./services/services');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookServices.createNewBookService,
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookServices.getAllBooksService,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookServices.getDetailBookService,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookServices.updateBookService,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookServices.deleteBookService,
  },
];

module.exports = routes;
