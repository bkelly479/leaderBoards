var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//dotenv file to access environment variables
var dotenv = require('dotenv');
dotenv.config();

//session middleware from AUTH0 documentation
var session = require('express-session');

var sess = {
  secret: "49b077e6-52f9-4980-ae27-6265362292dc",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if(app.get('env') === 'production'){
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
}

//load passport
var passport = require('passport');
var Auth0Strategy = require('passoprt-auth0');

//configure passport to use AUTH0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);


//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);


//use session
app.use(session(sess));

//need to be after app.use(session(sess))
app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
