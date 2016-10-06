var express = require('express');
var request = require('request');
var mongo = require('mongoose');

var configDB = require('../config/db.js');

mongo.connect(configDB.url);
//var db = mongo.db("mongodb://localhost:27017/mycvapp", { native_parser: true });


module.exports = function(app, passport) {

  app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

app.post('/register', passport.authenticate('local-signup', {
      successRedirect : '/login', // redirect to the secure profile section
      failureRedirect : '/register', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
