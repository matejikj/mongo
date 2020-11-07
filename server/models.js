const mongoose = require('mongoose');

const { Schema } = mongoose;

const woodSchema = new Schema({
  'name' : String,
  'created' : String,
  'quantity': Number
});

module.exports = mongoose.model('wood', woodSchema);
