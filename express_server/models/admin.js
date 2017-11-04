var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Define schema =====================================================================================================================================================================
var adminSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  accessCodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Code'}],
  listOfUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

// Define methods ====================================================================================================================================================================
adminSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Admin', adminSchema);
