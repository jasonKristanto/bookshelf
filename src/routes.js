const {
  main,
} = require('./controller/main');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: main,
  },
];

module.exports = routes;
