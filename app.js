var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var express = require('express');

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
    url: 'https://zcc8996.zendesk.com/api/v2/tickets.json',
    qs: {
      'sort_by': 'created_at',
      'sort_order': 'desc',
      'per_page': per_page,
      'page': page,
    },
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'authorization': 'Basic ' + new Buffer.from('helloparthshah@gmail.com:xapido123').toString('base64')
    }
  }

  request(options, function (error, response, body) {
    // console.log(body)
    if (error || !body) {
      next(error);
    } else {
      // Parse to json
      var json = JSON.parse(body);
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

module.exports = app;