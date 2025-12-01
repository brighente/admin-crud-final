import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const order = await Order.findById(id).populate('store_id').populate('supplier_id').populate('items.product_id');
  return NextResponse.json(order);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();
    
    const updateData = {
        status: data.status
    };

    const updated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado' });
}