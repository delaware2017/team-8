var express = require('express')
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
      })
      newCode.save(function(err, newCode) {
        if(err) throw err;
        user.accessCodes.push(newCode._id);
        user.save(function(err, updatedAdmin) {
          if (err) throw err;
        })
        res.send("new code");
      })
    })
  })
});

router.post('/accessCodes/:id', function(req, res) {
  Code.findById(req.params.id, function(err, code) {
    if (err) {
      res.send("no code");
    }
    if(code.user) {
      res.send("code already used");
    }
    else {
      res.send("valid code");
    }
  })
})


module.exports = router;
