var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({  
  id: String,
  name: String,
  email: String,
  password: String,
});
