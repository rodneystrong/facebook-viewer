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
