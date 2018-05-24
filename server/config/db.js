const config = require('./index');

let knex = require('knex')({
    client: 'mysql',
    connection: {
      host : config.connection.host,
      user : config.connection.user,
      password : config.connection.password,
      database : config.connection.database
    }
});

let bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;