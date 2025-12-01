import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Store from '@/models/store';

export async function GET(req, { params }) {
  await connectDB();
  const store = await Store.findById(params.id);
  return NextResponse.json(store);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Store.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Store.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deletado' });
}