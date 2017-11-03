var express = require('express');
var router = express.Router();

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

module.exports = router;
