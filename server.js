var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var passsport-facebook = require('passsportFacebook');
//.strategy
var FacebookStrategy = require('passport-facebook').strategy;

var app = express();

app.use(session({secret: "nerds and thugs"}));
app.use(passsport.initialize());
app.use(passsport.session());

passport.use(new FacebookStrategy({
  clientID: '763275367148700',
  clientSecret: '5c93663a52e1f589c8da962c1d63ec90',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.listen(9090);
