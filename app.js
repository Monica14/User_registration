var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var express_session = require('express-session');
var expressValidator = require('express-validator');
// var livereload  = require("connect-livereload");
// var autoReap  = require('multer-autoreap');
// autoReap.options.reapOnError = false;
// var flash = require('connect-flash');

mongoose.connect("mongodb://127.0.0.1:27017/user_data");

require('./Models/userdetailsModel');
require('./Models/newcontactModel');
require('./Models/reimbursmentModel');
require('./Models/reimbursment_applicationModel');
require('./Models/login_DetailsModel');

var app = express();

var userdata = mongoose.model("userfields");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
// app.use(autoReap);

app.use(express_session({
  secret: 'keyboard cat',
  rolling: true,
  resave: true,
  saveUninitialized: true,  
  cookie  : { maxAge  : 3600000,expires: new Date( Date.now() + 60 * 60 * 1000 )}
}));

// app.use(function (req, res, next) {   
//   res.locals.emaildata = req.session;
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
// app.use(livereload());


// app.use(function(req, res, next){ 
//   // Expose variable to templates via locals
//   res.locals.emaildata = req.session(); 
//   next();
//  });

var index = require('./routes/index');
var users = require('./routes/users');
var register_user = require('./routes/register_user');
var userlist = require('./routes/userlist');
var create_contact = require('./routes/create_contact');
var reimbursment = require('./routes/reimbursment');
var login = require('./routes/login');

// app.use(flash());

passport.serializeUser(function (user1, done) {
  //console.log()
  done(null, user1.id);
});

passport.deserializeUser(function (id, done) {
  userdata.findById(id, function (err, user1) {
    done(err, user1);
  });
});

app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.locals.emaildata = req.session;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/register_user', register_user);
app.use('/userlist', userlist);
app.use('/create_contact', create_contact);
app.use('/reimbursment', reimbursment);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
