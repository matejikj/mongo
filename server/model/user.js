const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  Id: String,
  Username: String,
  Password: String,
  Archiv: Boolean,
  Dokonceni: Boolean,
  Dvere: Boolean,
  Expedice: Boolean,
  IsAdmin: Boolean,
  Klapacka: Boolean,
  Kompletace: Boolean,
  Obchod: Boolean,
  Oblozky: Boolean,
  Posuv: Boolean,
  PrepisCisloZakazky: Boolean,
  PresunDoArchivu: Boolean,
  PresunDoExpedice: Boolean,
  PresunDoVyroby: Boolean,
  Priprava: Boolean,
  PripravarVyroby: Boolean,
  PristupDrevo: Boolean,
  PristupHlinik: Boolean,
  PristupOcel: Boolean,
  Ramecek: Boolean,
  Sklad: Boolean,
  Stredove: Boolean
})

module.exports = mongoose.model('user',UserSchema);
