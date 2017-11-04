var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var storeSchema = mongoose.Schema({
  name: {type: String},
  time: {type: String},
  distance: {type: String},
  latitude: {type: Number},
  longitude: {type: Number},
  address: {type: String}
})

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Store', storeSchema);
