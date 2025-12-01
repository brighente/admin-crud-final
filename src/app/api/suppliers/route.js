import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';

export async function GET() {
  await connectDB();
  const suppliers = await Supplier.find({});
  return NextResponse.json(suppliers);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newSupplier = await Supplier.create(data);
  return NextResponse.json(newSupplier, { status: 201 });
}