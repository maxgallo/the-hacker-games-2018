const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  message: String
});

const model = mongoose.model('Condition', schema)

module.exports = model;
