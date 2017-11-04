var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');

router.post('/accessCodes/create/:id', function(req, res) {
  Admin.findById(req.params.id, function(err, user) {
    console.log("found admin");
    Code.find({}, function(err, codes) {
      code = Math.floor(Math.random()*9000)+1000;
      for(var i=0; i<codes.length; i++) {
        if(code==codes[i].code) {
          code = Math.floor(Math.random()*9000)+1000;
        }
      }
      code = Math.floor(Math.random()*9000) + 1000;
      var newCode = new Code({
        code: code,
        admin: req.params.id
      })
      console.log(newCode);
      newCode.save(function(err, newCode) {
        if(err) throw err;
        user.accessCodes.push(newCode._id);
        user.save();
        console.log(user);
        res.send("new code");
      })
    })
  })
});

router.post('/accessCodes/:id', function(req, res) {
  Code.findOne({code: req.params.id}, function(err, code) {
    if (err) {
      res.send("no code");
    }
    if(!code) {
      res.send("no code")
    }
    else if(code.user) {
      res.send("code already used");
    }
    else {
      res.send("valid code");
    }
  })
})

router.post('/admin/signup', (req, res) => {
  var admin = new Admin({
    "username": req.body.username,
    "password": req.body.password,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName
  });
  admin.save();
  res.send(listOfUsers);
})

router.post('/admin/login', function(req, res) {
  Admin.findOne({username: req.body.username}, function(err, admin) {
    if (err) throw err;
    if(req.body.password==admin.password) {
      var info = [];
      for(var i=0; i<admin.listOfUsers.length; i++) {
        User.findById(admin.listOfUsers[i], function(err, user) {
          info.push({"firstName": user.firstName, "lastName": user.lastName, "balance": user.balance});
          console.log(info);
        })
        console.log(info);
      }
      console.log(info);
      res.send(info);
    }
    else {
      res.send("error");
    }
  })
})


module.exports = router;
