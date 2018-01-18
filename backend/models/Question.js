const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'Question';

const schema = new Schema({
  message: String,
  level: Number,
});

const model = mongoose.model(collectionName, schema, collectionName);

module.exports = model;
