import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Store from '@/models/store';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção para Next.js 15
  
  try {
    const store = await Store.findById(id);
    if (!store) return NextResponse.json({ error: 'Loja não encontrada' }, { status: 404 });
    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção para Next.js 15
  
  try {
    const data = await req.json();
    const updated = await Store.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção para Next.js 15

  try {
    await Store.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}