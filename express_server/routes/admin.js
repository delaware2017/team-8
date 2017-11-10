var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');
var async = require('async');
var dbActions = require('../db');

//create acess codes for patient to use to sign up
router.post('/accessCodes/create/:id', dbActions.accessCodesCreateId);

//check that the access code is valid
router.post('/accessCodes', dbActions.accessCodes);

//admin signup
router.post('/asignup', dbActions.adminSignup);

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
