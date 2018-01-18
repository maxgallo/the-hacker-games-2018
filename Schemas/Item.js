var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

export default new Schema({  
  id: String,
  type: String, //Condition, Answer, Question
  message: String,
});
