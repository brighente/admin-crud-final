import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Erro id inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();
  const updated = await User.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado com sucesso' });
}