import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const data = await req.json();
    const updated = await Supplier.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await

  try {
    await Supplier.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}