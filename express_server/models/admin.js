var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var adminSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  accessCodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Code'}],
  listOfUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Admin', adminSchema);
