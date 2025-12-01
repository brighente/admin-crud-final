import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

// MANTENHA O GET PARA LISTAR OS USUÁRIOS NA TELA DE LISTAGEM
export async function GET() {
  await connectDB();
  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// O NOVO POST CORRIGIDO
export async function POST(request) {
  try {
    await connectDB();

    // 1. Recebe os dados com os nomes que vêm do Front-end
    const body = await request.json();
    const { nome, email, perfil } = body;

    // Validação simples
    if (!nome || !email || !perfil) {
      return NextResponse.json(
        { message: 'Preencha todos os campos (nome, email, perfil).' }, 
        { status: 400 }
      );
    }

    // 2. Lógica para gerar o login (user) baseado no email
    // Ex: joao@loja.com vira "joao"
    const generatedUser = email.split('@')[0];

    // 3. Verifica duplicidade (Email ou User)
    const userExists = await User.findOne({ 
      $or: [{ contact_email: email }, { user: generatedUser }] 
    });

    if (userExists) {
      return NextResponse.json(
        { message: 'Já existe um usuário com este e-mail.' },
        { status: 409 }
      );
    }

    // 4. Gera a Senha Padrão (123456) e Criptografa
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // 5. CRIA O OBJETO TRADUZINDO OS CAMPOS
    // Esquerda: Nome no Banco (Model) = Direita: Valor calculado/Front
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