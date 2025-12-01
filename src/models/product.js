import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Opcional
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true }, // Quantidade em estoque
  category: { type: String }, // Novo campo
  image: { type: String },    // Novo campo (URL da foto)
  
  // Referência ao Fornecedor (Foreign Key)
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  
  status: { type: String, default: 'on' }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);