const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'User';

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

const model = mongoose.model(collectionName, schema, collectionName)

module.exports = model;
