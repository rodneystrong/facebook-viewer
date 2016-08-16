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

app.listen(9090);
