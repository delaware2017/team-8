var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var codeSchema = mongoose.Schema({
  code: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  admin: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
  plan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'}
})

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Code', codeSchema);
