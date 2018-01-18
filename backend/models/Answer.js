const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  message: String,
  weight: Number,
});

const model = mongoose.model('Answer', schema)

module.exports = model;
