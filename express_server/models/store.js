var mongoose = require('mongoose');

// Define schema =====================================================================================================================================================================
var storeSchema = mongoose.Schema({
  name: {type: String},
  time: {type: String},
  distance: {type: String},
  latitude: {type: String},
  longitude: {type: String}
})

// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Store', storeSchema);
