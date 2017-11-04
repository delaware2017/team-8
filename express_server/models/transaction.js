var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var transactionSchema = mongoose.Schema({
  amount: {type: String},
  retailer: {type: String},
  date: {type: Date},
  positive: {type: Boolean}
})

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Transaction', transactionSchema);
