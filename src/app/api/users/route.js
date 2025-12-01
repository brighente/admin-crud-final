import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function GET() {
  await connectDB();
  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { nome, email, perfil } = body;

    if (!nome || !email || !perfil) {
      return NextResponse.json(
        { message: 'Preencha todos os campos (nome, email, perfil).' }, 
        { status: 400 }
      );
    }

    const generatedUser = email.split('@')[0];

    const userExists = await User.findOne({ 
      $or: [{ contact_email: email }, { user: generatedUser }] 
    });

    if (userExists) {
      return NextResponse.json(
        { message: 'Já existe um usuário com este e-mail.' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const newUser = new User({
      name: nome,               
      contact_email: email,     
      user: generatedUser,      
      pwd: hashedPassword,      
      level: perfil,            
      status: 'on'
    });

    await newUser.save();

    return NextResponse.json({ 
      message: 'Criado com sucesso!', 
      user: newUser 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar user:", error);
    return NextResponse.json(
      { message: 'Erro ao criar usuário', error: error.message }, 
      { status: 400 }
    );
  }
}