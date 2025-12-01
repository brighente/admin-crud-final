import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';

export async function GET(req, { params }) {
  await connectDB();
  const order = await Order.findById(params.id)
    .populate('store_id')
    .populate('items.product_id');
  return NextResponse.json(order);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Order.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deletado' });
}