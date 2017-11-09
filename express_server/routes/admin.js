var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');
var async = require('async');
import dbActions from '../db.js';
console.log(dbActions);
//create acess codes for patient to use to sign up
router.post('/accessCodes/create/:id', );

//check that the access code is valid
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

//admin signup
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

//admin login
router.post('/alogin', function(req, res) {
  console.log('admin login:');
  Admin.findOne({username: req.body.username}, function(err, admin) {
    if (err) throw err;
    if(req.body.password==admin.password) {
      User.find({'_id': admin.listOfUsers}, function(err, docs) {
        res.send(docs);
      })
      /*
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
    });*/
  }
    else {
      res.send("error");
    }
  })
})

module.exports = router;
