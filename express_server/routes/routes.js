var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Admin = require('../models/admin');

module.exports = function(passport) {



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




  return router;
};
