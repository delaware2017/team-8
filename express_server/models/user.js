var mongoose = require('mongoose');

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
  balance: {type: Number},
  physician: {type: mongoose.Schema.Types.ObjectID, ref: 'Admin'},
  plan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'}
})

// Define methods ====================================================================================================================================================================

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('User', userSchema);
