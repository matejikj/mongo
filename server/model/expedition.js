const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExpeditionSchema = new Schema({
  OrderId: Number,
  ExpedicePoradi: String,
  ExpediceAuto: Boolean,
  ExpediceDatum: Date,
  DoplnMat: String,
  KridlaKsExpedovanych: String,
  ZarubneKsExpedovanych: String,
  ExpeditedSortNr: Number,
  KridlaKsZbyvaExpedovat: String,
  ZarubneKsZbyvaExpedovat: String,
  ExepdiceColor: String,
  AutoColor: String
})

module.exports = mongoose.model('expedition',ExpeditionSchema);
