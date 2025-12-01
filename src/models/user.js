import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_email: { type: String, required: true, unique: true },
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  level: { type: String, enum: ['admin', 'common'], default: 'common' },
  status: { type: String, default: 'on' }
}, { timestamps: true });

// A CORREÇÃO ESTÁ AQUI:
// Verifica se "mongoose.models.User" já existe.
// Se existir, usa ele. Se não, cria um novo.
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;


// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contact_email: { type: String, required: true, unique: true },
//   user: { type: String, required: true, unique: true },
//   pwd: { type: String, required: true }, // Lembre-se de hash a senha antes de salvar
//   level: { type: String, enum: ['ADMIN', 'LOJA','FORNECEDOR'], default: 'ADMIN' },
//   status: { type: String, default: 'on' }
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);