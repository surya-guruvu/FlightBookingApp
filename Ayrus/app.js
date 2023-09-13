var createError = require('http-errors');
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const fs = require('fs');
const Sentry = require("@sentry/node");


var session = require('express-session');
// var FileStore = require('session-file-store')(session);


const cors = require('cors');

var app = express();

Sentry.init({
  dsn: "https://66f92aa3b2b18239661c0ad1df6a2bb5@o4505658993016832.ingest.sentry.io/4505659013332992",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
// console.log(Sentry.Handlers);

app.use(Sentry.Handlers.requestHandler()); //for tracing HTTP request
app.use(Sentry.Handlers.tracingHandler()); // for express
//Because of this, If error is not being handled by catch then it automatically sends to sentry
//Else, we have to send using Sentry.captureException() 

io.on('connection', (socket) => {
  console.log('A user connected');

  // Define your Socket.io event handlers here

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flightRouter = require('./routes/flightRouter');
var authenticate = require('./authenticate');
var fileUpload = require('./routes/fileUpload');
const bookRouter = require('./routes/bookRouter');


 
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flights',flightRouter);
app.use('/upload_files',fileUpload);
app.use('/book_flight',bookRouter);



const url='mongodb://127.0.0.1/Ayrus';
const connect=mongoose.connect(url);
connect.then((db)=>{
  console.log("connected correctly to the server");
})
.catch((err)=>{
  Sentry.captureException(err); 
  console.log(err);
})

app.use(Sentry.Handlers.errorHandler());



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
  // // console.log("Error");
  // // console.log(res.sentry);
  // res.statusCode = 500;
  // res.end(res.sentry + "\n");
});

module.exports = app;
