const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

//-- BD
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
  // BD --

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: config.cors.origin,
    credentials: Boolean(config.cors.credentials)
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
    res.header("Access-Control-Request-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
  });

const api = require('./api/v1');

app.use('/api', api);
app.use('/api/v1', api);

app.use('/', function (req, res) {
    res.send('Api api-incbaq!')
  });

app.use((req, res, next) =>{
    res.status(404);
    res.json({ 
        message: "Not found"
    });
});

app.use((err, req, res, next) =>{
    res.status(500);
    res.json({ 
        message: err.message
    });
});

module.exports = app;