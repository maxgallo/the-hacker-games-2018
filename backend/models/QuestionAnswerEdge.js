const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'QuestionAnswerEdge';

const schema = new Schema({
  question: {
    id: String
  },
  answer: {
    id: String
  }
});

const model = mongoose.model(collectionName, schema, collectionName);

module.exports = model;
