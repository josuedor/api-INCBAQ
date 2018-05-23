const config = require('./server/config');
//const app = require('./server');

const express = require('express');
const bodyParser = require('body-parser');

// --

//-- BD
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '159.89.226.118',
    user : 'uninorte',
    password : 'Uninorte2018$',
    database : '3306'
  }
});
var bookshelf = require('bookshelf')(knex);
// BD --

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
  res.header("Access-Control-Request-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send('Page under construction.');
  //res.sendfile('index.htm')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

app.listen(config.port, config.hostname, () => {
  console.log(`The server is running at http://${config.hostname}:${config.port}/`);
});

