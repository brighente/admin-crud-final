const mongoose = require('mongoose');

// Sub-schema para os itens do pedido
const OrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  campaign_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', default: null },
  unit_price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  items: [OrderItemSchema], // Array de itens conforme [cite: 115]
  total_amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered'], // Status definidos no PDF [cite: 117]
    default: 'Pending' 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);