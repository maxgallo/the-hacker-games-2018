var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

export default new Schema({  
  question: {
      id: String
  },
  answer: {
      id: String
  }
});
