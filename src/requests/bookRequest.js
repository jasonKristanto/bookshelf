const validator = require('validator');

module.exports = {
  validate: (req) => {
    if (!req) {
      return false;
    }

    if (typeof req.author !== 'string' || validator.isEmpty(req.author)) {
      return false;
    }

    if (typeof req.summary !== 'string' || validator.isEmpty(req.summary)) {
      return false;
    }

    if (typeof req.publisher !== 'string' || validator.isEmpty(req.publisher)) {
      return false;
    }

    if (typeof req.year !== 'number' || req.year > new Date().getFullYear()) {
      return false;
    }

    if (typeof req.pageCount !== 'number' || req.pageCount <= 0) {
      return false;
    }

    if (typeof req.readPage !== 'number') {
      return false;
    }

    if (typeof req.reading !== 'boolean') {
      return false;
    }

    return true;
  },
};
