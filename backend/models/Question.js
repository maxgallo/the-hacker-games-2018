const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'Question';

const schema = new Schema({
  message: String,
  level: Number,
  nextQuestion: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  link: String,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

const model = mongoose.model(collectionName, schema, collectionName);

module.exports = model;