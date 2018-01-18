var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

export default new Schema({  
  id: String,
  user: {
      id: String
  },
  answer: {
      id: String
  }
});
