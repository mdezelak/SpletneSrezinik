var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');
var uporabnikRouter = require('./routes/uporabnik');
var kolesaUporabnikaRouter = require('./routes/kolesaUporabnika');
var koloRouter = require('./routes/kolo');
var vsakolesaRouter = require('./routes/vsakolesa');
var izposojenakolesaRouter = require('./routes/izposojenakolesa');
var potrjevanjeizposojeRouter = require('./routes/potrjevanjeizposoje');
var pridobiuporabnikaRouter = require('./routes/pridobiuporabnika');


var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


const cors = require('cors');

app.use('/',cors(), index);
app.use('/uporabnik',cors(), uporabnikRouter);
app.use('/kolesaUporabnika',cors(), kolesaUporabnikaRouter);
app.use('/kolo',cors(), koloRouter);
app.use('/vsakolesa',cors(), vsakolesaRouter);
app.use('/izposojenakolesa',cors(), izposojenakolesaRouter);
app.use('/potrjevanjeizposoje',cors(), potrjevanjeizposojeRouter);
app.use('/pridobiuporabnika',cors(), pridobiuporabnikaRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
