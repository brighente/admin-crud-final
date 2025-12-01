const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  store_name: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  contact_email: { type: String, required: true },
  status: { type: String, default: 'on' }
});

module.exports = mongoose.model('Store', StoreSchema);