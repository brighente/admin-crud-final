const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplier_name: { type: String, required: true },
  supplier_category: { type: String, required: true },
  contact_email: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, default: 'on' }
});

module.exports = mongoose.model('Supplier', SupplierSchema);