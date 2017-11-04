var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var Code = require('../models/code');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('account/new', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;
  // optional information
  const address = req.body.address || "";
  const phone = req.body.phone || 0;
  const email = req.body.email || "";
  const numFamily = req.body.numFamily || "";

});

router.post('account/create', function(req, res) {
  var newUser = new User({
    code: req.body.code,
    name: req.body.name,
    address: req.body.address
  })
  newUser.save(function(err, newUser) {
    if (err) throw err;
    Code.findById(req.body.code, function(err, code) {
      if (err) throw err;
      code.user = newUser._id;
    })
  })
})

router.post('/login', function(req, res) {
  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) throw err;
    if(req.body.password=user.password) {
      res.send("successful login");
    }
  })
})

module.exports = router;
