const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  answer: {
    id: String
  },
  condition: {
    id: String
  }
});

const model = mongoose.model('AnswerConditionEdge', schema)

module.exports = model;
