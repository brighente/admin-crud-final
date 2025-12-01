import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';

export async function GET(req, { params }) {
  await connectDB();
  const supplier = await Supplier.findById(params.id);
  return NextResponse.json(supplier);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Supplier.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Supplier.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deletado' });
}