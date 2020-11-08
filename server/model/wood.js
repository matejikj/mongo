const mongoose = require('mongoose');
const {Schema} = mongoose;

const WoodSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('wood',WoodSchema);
