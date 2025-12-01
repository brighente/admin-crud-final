import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const supplier = await Supplier.findById(id);
  return NextResponse.json(supplier);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    // TRADUÇÃO
    const updateData = {
        supplier_name: data.nome_fantasia,
        corporate_reason: data.razao_social,
        cnpj: data.cnpj,
        contact_email: data.email,
        phone_number: data.telefone
    };

    const updated = await Supplier.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Supplier.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado' });
}