//Configuration=================================================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var key = require('./secret/key.json');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var users = require('./routes/users');
var admin = require('./routes/admin');
var mongoose = require('mongoose');
var async = require('async');
mongoose.connect("mongodb://dchang2:asdf@ds147265.mlab.com:47265/team-8");
var app = express();
var router = express.Router();

var User = require('./models/user');
var Transaction = require('./models/transaction');

//Function to add balance of $1/day/family member
setInterval(automaticBalance, 30000);
function automaticBalance() {
  User.find({}, function(err, users) {
    if(err) throw err;

    async.each(users,
    function(user, callback){
      var newTransaction = new Transaction({
          "amount": user.numFamily,
          "retailer": "Daily",
          "positive": true,
          "date": Date.now()
        })
        newTransaction.save(function(err, transactionInfo) {
          user.transactions.push(newTransaction._id);
          user.balance=(parseFloat(user.balance)+user.numFamily).toString();
          user.save();
          // console.log(user);
        })
    })

  })
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'http://localhost:8100'}));
app.use(users)
app.use(admin)
app.use(users)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () { // TODO: Change port back
  console.log('Express listening at', 3000);
});

module.exports = app;
