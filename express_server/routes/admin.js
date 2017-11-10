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
router.post('/alogin', dbActions.adminLogin);

module.exports = router;
