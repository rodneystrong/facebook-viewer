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

//Define auth endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passsport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/'
}))
//the above steps are passport steps. Very important to understand that.

//Create the deserialize/serilize methods on passport
//serialize just means takes in a string. deserialize means the opposite
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.listen(9090);
