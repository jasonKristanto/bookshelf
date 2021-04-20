const {createNewBookService} = require('./createNewBookService');
const {getAllBooksService} = require('./getAllBooksService');
const {getDetailBookService} = require('./getDetailBookService');
const {updateBookService} = require('./updateBookService');
const {deleteBookService} = require('./deleteBookService');

module.exports = {
  createNewBookService,
  getAllBooksService,
  getDetailBookService,
  updateBookService,
  deleteBookService,
};
