const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'Question';

const schema = new Schema({
  message: String,
  level: Number,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

const model = mongoose.model(collectionName, schema, collectionName);

module.exports = model;