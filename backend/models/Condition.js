const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'Condition';

const schema = new Schema({
  message: String
});

const model = mongoose.model(collectionName, schema, collectionName)

module.exports = model;
