import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
  store_name: { type: String, required: true },     // Nome Fantasia
  corporate_reason: { type: String },               // Razão Social
  cnpj: { type: String, required: true, unique: true },
  contact_email: { type: String, required: true },
  phone_number: { type: String },
  
  // Endereço estruturado
  address: {
    street: { type: String },      // Logradouro
    number: { type: String },      // Numero
    district: { type: String },    // Bairro
    city: { type: String },        // Cidade
    state: { type: String },       // Estado
    zip_code: { type: String }     // CEP
  },

  status: { type: String, default: 'on' }
}, { timestamps: true });

export default mongoose.models.Store || mongoose.model('Store', StoreSchema);