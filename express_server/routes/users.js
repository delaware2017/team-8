var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');

router.post('/user/signup', function(req, res) {
  Code.findOne({code: req.body.code}, function(err, code) {
    var newUser = new User({
      "username": req.body.username,
      "password": req.body.password,
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "code": code._id
    })
    console.log(newUser);
    newUser.save(function(err, newUser) {
      if (err) throw err;
      console.log("here");
        code.user = newUser._id;
        console.log(code);
        Admin.findById(code.admin, function(err, admin) {
          console.log("here2");
          console.log(admin);
          admin.listOfUsers.push(newUser._id)
          console.log(admin);
          admin.save();
          code.save(function(err, updatedCode) {
            console.log("here4");
            if (err) throw err;
            res.send("successful signup")
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
