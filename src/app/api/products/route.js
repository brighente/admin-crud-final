import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';

export async function GET() {
  await connectDB();
  // Populate traz os dados do fornecedor junto, em vez de só o ID
  const products = await Product.find({}).populate('supplier_id'); 
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newProduct = await Product.create(data);
  return NextResponse.json(newProduct, { status: 201 });
}