import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  
  // Campos ajustados para o formulário
  sales_goal: { type: Number, required: true }, // Meta em R$
  duration_days: { type: Number, required: true }, // Duração em dias
  
  start_date: { type: Date, default: Date.now }, // Data de início automática
  status: { type: String, default: 'Active', enum: ['Active', 'Ended'] }
}, { timestamps: true });

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);