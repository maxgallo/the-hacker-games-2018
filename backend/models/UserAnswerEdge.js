const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    id: String
  },
  answer: {
    id: String
  }
});

const model = mongoose.model('UserAnswerEdge', schema)

module.exports = model;
