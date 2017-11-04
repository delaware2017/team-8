var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Admin = require('../models/admin');

module.exports = function(passport) {

  // Retrieve registration page
  router.get('/signup', function(req, res) {
    res.send("signup")
  });
  router.get('/home', function(req, res) {
    res.send("successful signup");
  })

  router.post('/signup', (req, res) => {
    var user = new User({
      "username": req.body.username,
      "password": req.body.password,
      "firstName": req.body.firstName,
      "lastName": req.body.lastName
    });
    user.save();
    res.send(200);
  })
  
  // router.post('/signup', passport.authenticate('local-register', {
  //     successRedirect : '/home',
  //     failureRedirect : '/signup'
  //   })
  // );

  // Retrieve login page
  router.get('/', function(req, res) {
    if(req.user) {
      res.redirect('home');
    }
    else {
      res.render('index');
    }
  });

  // Processs the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the main page
    failureRedirect : '/login' // redirect back to the login page if there is an error
  }));

  // Logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });



  return router;
};
