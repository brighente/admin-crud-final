import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id).populate('supplier_id');
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    // TRADUÇÃO
    const updateData = {
        name: data.nome,
        price: parseFloat(data.valor),
        stock_quantity: parseInt(data.estoque),
        category: data.categoria,
        supplier_id: data.id_fornecedor,
        image: data.foto
    };

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado' });
}