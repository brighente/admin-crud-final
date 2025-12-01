import { NextResponse } from 'next/server';
import connectDB from '@/db'; // Verifique se o caminho do seu db.js está correto
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    // Pega os dados que vieram do formulário
    // O frontend deve estar mandando { user: "...", password: "..." }
    const body = await request.json();
    const { email, senha } = body;

    // 1. Busca o usuário pelo campo 'user' (que é o login no seu Schema)
    // Usamos .select('+pwd') para garantir que a senha venha na consulta
    const foundUser = await User.findOne({ user: email });

    if (!foundUser) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
    }

    // 2. Compara a senha digitada com a senha criptografada no banco (foundUser.pwd)
    const isMatch = await bcrypt.compare(senha, foundUser.pwd);

    if (!isMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    // 3. Se chegou aqui, o login foi sucesso!
    // Retornamos os dados do usuário (menos a senha) e o status 200
    const { pwd, ...userData } = foundUser._doc;

    return NextResponse.json({ 
      message: 'Login realizado com sucesso',
      user: userData 
    }, { status: 200 });

  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}