var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var express = require('express');
require('dotenv').config({
  path: './pwd.env'
})

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

app.get('/ticket', function (req, res, next) {
  res.render('ticket', {
    title: 'Express'
  });
});

// get request for zendesk api to get all tickets
app.get('/tickets', function (req, res, next) {
  let page = req.query.page;
  let per_page = req.query.per_page;

  var request = require('request');
  var options = {
    method: 'GET',
    url: process.env.ZENDESK_URL,
    qs: {
      'sort_by': 'created_at',
      'sort_order': 'desc',
      'per_page': per_page,
      'page': page,
    },
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'authorization': 'Basic ' + new Buffer.from(process.env.EMAIL_ID + ':' + process.env.EMAIL_PASSWORD).toString('base64')
    }
  }

  request(options, function (error, response, body) {
    if (error || !body) {
      next(error);
    } else {
      // Parse to json
      var json = JSON.parse(body);
      if (json.error) {
        next(createError(401, json.error));
      } else
        res.json(json);
    }
  });
});

// catch 404 and forward to error handler
app.get('*', function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
}).on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}