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
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    // optional
    user.firstName = req.body.firstName || "";
    user.lastName = req.body.lastName || "";
    user.address = req.body.address || "";
    user.phone = req.body.phone || -1;
    user.email = req.body.email || "";
    user.numFaily = req.body.numFaily || 0;
    user.balance = req.body.balance || 0;
    user.physician = req.body.physician || null;
    user.plan = req.body.plan || null;
  });

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
