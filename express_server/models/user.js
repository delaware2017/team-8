var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Define schema =====================================================================================================================================================================
var userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String},
  phone: {type: String},
  email: {type: String},
  numFamily: {type: Number},
  balance: {type: String},
  code: {type: mongoose.Schema.Types.ObjectId, ref: 'Code'},
  transactions: {type: mongoose.Schema.Types.ObjectId, ref: 'Transcation'},
  plan: {type: Number}
})

// Define methods ====================================================================================================================================================================
userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('User', userSchema);
