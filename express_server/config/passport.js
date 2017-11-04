var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var Admin = require('../models/admin');
//Passport session setup ============================================================================================================================================================

//Serialization
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Deserialization
passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, user) {
    done(err, user);
  });
});

//Sign Up =================================================================================================================================================================
passport.use('local-register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, username, password, done) {
  console.log("Helo2");
  process.nextTick(function() {
    console.log("hello");
    Admin.findOne({'username' : username}, function(err, user) {
      if(err)
        return done(err);
      if(user) {
        return done(null, false)
      } else if(req.body.password != req.body.confirmPassword) {
        return done(null, false)
      }
      else {
        var newAdmin = new Admin()
          newAdmin.username = username,
          newAdmin.password = newAdmin.hashPassword(req.body.password)
          newAdmin.save(function(err) {
            if (err) throw err;
            console.log("saved");
            return done(null, newAdmin);
          })
      }
    })
  })
}))

//Login =============================================================================================================================================================================
passport.use('local-login', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
	function(req, username, password, done) {
    console.log("Here.");
    // Asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      // Find a user whose email is the same as the forms email and check to see if the user trying to sign up already exists
      Admin.findOne({ 'username' :  username }, function(err, user) {
        // If there are any errors, return the error
        if (err)
          return done(err);
        if (!user) {
          return done(null, false);
        } else if (!user.validatePassword(password)) {
          return done(null, false);
        } else {
          //Found the user and logs the user in
          return done(null, user);
        }
      });
    });
}));

//Export passport ===================================================================================================================================================================
module.exports = passport;
