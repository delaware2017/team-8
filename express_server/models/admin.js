var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var adminSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  listOfUsers: [{type: mongoose.Schema.Types.ObjectID, ref: 'User'}]
})

// Define methods ====================================================================================================================================================================

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Admin', adminSchema);
