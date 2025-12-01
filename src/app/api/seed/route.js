import { NextResponse } from 'next/server';
import connectDB from '@/db'; // Confirme se o caminho do seu db.js é esse mesmo
import User from '@/models/user'; 
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // 1. Verifica se já existe o usuário pelo campo 'user' (que é único)
    const userExists = await User.findOne({ user: 'admin' });
    
    if (userExists) {
      return NextResponse.json({ message: 'Usuário Admin já existe!' }, { status: 400 });
    }

    // 2. Criptografa a senha "123456"
    // O sistema de login precisa disso para validar depois
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // 3. Cria o Admin respeitando seu Schema
    const newUser = new User({
      name: 'Administrador',
      contact_email: 'admin@sistema.com',
      user: 'admin',          // Campo de login
      pwd: hashedPassword,    // Senha criptografada
      level: 'ADMIN',         // Enum correto
      status: 'on'
    });

    await newUser.save();

    return NextResponse.json({ 
      message: 'Sucesso! Use -> Usuário: admin / Senha: 123456',
      createdUser: newUser 
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar', error: error.message }, { status: 500 });
  }
}