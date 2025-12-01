import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const order = await Order.findById(id)
      .populate('store_id')
      .populate('supplier_id')
      .populate('items.product_id');

    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const data = await req.json();
    
    // Aqui poderíamos ter lógica para não deixar editar pedido entregue, etc.
    const updated = await Order.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await

  try {
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}