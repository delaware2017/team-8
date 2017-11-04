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
        admin: req.params.id,
        plan: req.body.plan
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

router.post('/accessCodes', function(req, res) {
  Code.findOne({code: req.body.code}, function(err, code) {
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

router.post('/asignup', (req, res) => {
  var admin = new Admin({
    "username": req.body.username,
    "password": req.body.password,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName
  });
  admin.save(function(err, newAdmin) {
    console.log(newAdmin);
  });
});

router.post('/alogin', function(req, res) {
  console.log('admin login:');
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
      console.log("error: " + JSON.stringify(info));
      res.send(info);
    });
    }
    else {
      res.send("error");
    }
  })
})

module.exports = router;
