const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  question: {
    id: String
  },
  answer: {
    id: String
  }
});

const model = mongoose.model('QuestionAnswerEdge', schema)

module.exports = model;
