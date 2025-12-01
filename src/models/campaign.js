const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  discount_percentage: { type: Number, required: true }
});

module.exports = mongoose.model('Campaign', CampaignSchema);