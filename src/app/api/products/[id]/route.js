import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id).populate('supplier_id');
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deletado' });
}