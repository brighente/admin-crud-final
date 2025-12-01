import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  supplier_name: { type: String, required: true }, // Nome Fantasia
  corporate_reason: { type: String },              // Razão Social
  cnpj: { type: String, required: true, unique: true },
  supplier_category: { type: String, default: 'Geral' }, // Categoria (Default pois não tem no form)
  contact_email: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, default: 'on' }
}, { timestamps: true });

// Exportação padrão para Next.js
export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);