var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({  
  name: String,
  email: String,
  password: String,
});
