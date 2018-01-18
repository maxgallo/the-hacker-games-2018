var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

module.exports = new Schema({  
  question: {
      id: String
  },
  answer: {
      id: String
  }
});
