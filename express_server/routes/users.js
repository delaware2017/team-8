var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');

router.post('/user/signup', function(req, res) {
  var newUser = new User({
    "username": req.body.username,
    "password": req.body.password,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "code": req.body.code
  })
  console.log(newUser);
  newUser.save(function(err, newUser) {
    if (err) throw err;
    Code.findById(req.body.code, function(err, code) {
      if (err) throw err;
      code.user = newUser._id;
      code.save(function(err, updatedCode) {
        if (err) throw err;
        Admin.findById(code.admin, function(err, admin) {
          admin.save(function(err, updatedAdmin) {
            if (err) throw err;
          })
        })
      })
    })
  })
})

router.post('/login', function(req, res) {
  console.log(req.body);
  User.findOne({username: req.body.username}, function(err, user) {
    console.log(user);
    if (err) throw err;
    if(req.body.password==user.password) {
      res.send("successful login");
    }
    else {
      res.send("unsuccessful login");
    }
  })
})

module.exports = router;
