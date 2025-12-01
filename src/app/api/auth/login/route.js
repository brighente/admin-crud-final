import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, senha } = body;

    const foundUser = await User.findOne({ user: email });

    if (!foundUser) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(senha, foundUser.pwd);

    if (!isMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

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