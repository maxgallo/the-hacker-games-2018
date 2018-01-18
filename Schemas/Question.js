var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

export default new Schema({  
  message: String,
  level: Number,
});
