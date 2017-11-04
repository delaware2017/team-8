var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');
var async = require('async');

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
        res.send(newCode.code);
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
  var info = [];
  async.each(admin.listOfUsers,
  function(user, callback){
    User.findById(user, function(err, userInfo) {
      info.push({"firstName": userInfo.firstName, "lastName": userInfo.lastName, "balance": userInfo.balance});
      callback();
    });
  },
function (err) {
  res.send(info);
});
})

router.post('/admin/login', function(req, res) {
  Admin.findOne({username: req.body.username}, function(err, admin) {
    if (err) throw err;
    if(req.body.password==admin.password) {
      var info = [];
      async.each(admin.listOfUsers,
      function(user, callback){
        User.findById(user, function(err, userInfo) {
          info.push({"firstName": userInfo.firstName, "lastName": userInfo.lastName, "balance": userInfo.balance});
          callback();
        });
      },
    function (err) {
      res.send(info);
    });
    }
    else {
      res.send("error");
    }
  })
})


module.exports = router;
