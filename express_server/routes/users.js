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
      "code": code._id,
      "email": req.body.email,
      "numFamily": req.body.numFamily,
      "balance": 0.00
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
            res.send(newUser._id);
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
      res.send(user._id);
    }
    else {
      res.send("unsuccessful login");
    }
  })
})

router.post('/balance', function(req, res) {
  User.findById(req.body.id, function(err, user) {
    if (err) throw err;
    res.send(user.balance);
  })
})

router.post('/:id/add', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) throw err;
    user.balance=(parseFloat(user.balance)+parseFloat(req.body.add)).toString();
    user.save();
    res.send(user.balance);
  })
})

router.post('/:id/:max', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) throw err;
    if(parseFloat(req.params.max)>=parseFloat(req.body.deduct)) {
      user.balance=(parseFloat(user.balance)-parseFloat(req.body.deduct)).toString();
      user.save();
      res.send('0');
    }
    else {
      user.balance=(parseFloat(user.balance)-parseFloat(req.params.max)).toString();
      user.save();
      res.send((parseFloat(req.body.deduct)-parseFloat(req.params.max)).toString());
    }
  })
})

module.exports = router;