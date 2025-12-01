import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_email: { type: String, required: true, unique: true },
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  level: { type: String, enum: ['ADMIN', 'LOJA', 'FORNECEDOR'], default: 'ADMIN' },
  status: { type: String, default: 'on' }
}, { timestamps: true });

// A linha abaixo evita o erro de "OverwriteModelError" e usa export default
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;