import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  try {
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json(); // chega: { nome, email, perfil }

    const updateData = {
        name: data.nome,
        contact_email: data.email,
        level: data.perfil
    };

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado com sucesso' });
}