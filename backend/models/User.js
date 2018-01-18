const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
});

const model = mongoose.model('User', schema)

module.exports = model;
