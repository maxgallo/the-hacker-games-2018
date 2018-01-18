const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'Answer';

const schema = new Schema({
  message: String,
  weight: Number,
  condition: { type: Schema.Types.ObjectId, ref: 'Condition' },
});

const model = mongoose.model(collectionName, schema, collectionName)

module.exports = model;
