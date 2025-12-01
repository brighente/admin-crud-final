import mongoose from 'mongoose';

// Sub-schema para os itens do pedido
const OrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true } // Preço no momento da compra
});

const OrderSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }, // Importante saber quem vendeu
  items: [OrderItemSchema], 
  total_amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);