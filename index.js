var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
// var passsportFacebook = require('passsportFacebook');
//.strategy
var FacebookStrategy = require('passport-facebook').Strategy;
//how do you require a file in Node? The code below
var myKeys = require('./keys');

var app = express();

app.use(expressSession({secret: "nerds and thugs"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  //Initially you put your keys here. but now we removed them and put them in a new
  //file called keys.js
  //move you keys to a new file, require that file, call those keys via an object
  clientID: 'myKeys.facebookKey',
  clientSecret: 'myKeys.facebookSecret',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

//Define auth endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/'
}))
//the above steps are passport steps. Very important to understand that.

//Create the deserialize/serilize methods on passport
//serialize just means takes in a string. deserialize means the opposite
passport.serializeUser(function(user, done) {
  //change the below from 'user' to 'profile'
  done(null, profile);
});

passport.deserializeUser(function(obj, done) {
  done(null, deserializeUser);
});

app.get('/me', function(req, res) {
  res.send(req.user);
  //req.user is your deserializeUser. so change the above code from 'obj' to deserializeUser
})

//to get the right port below, go to your facebook developer dashboard, click "settings" in
//the left sidebar, then click "add platform", choose "website", then put http://localhost:3000/
//in the "site URL"
app.listen(3000);

//After all this, you can run "nodemon" in your terminal!
//We don't have a default URL, so you gotta type in http://localhost:3000/auth/facebook
