var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

module.exports = new Schema({  
  name: String,
  email: String,
  password: String,
});
