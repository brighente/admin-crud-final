import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';

export async function GET() {
  await connectDB();
  const orders = await Order.find({})
    .populate('store_id')        // Traz dados da loja
    .populate('items.product_id'); // Traz dados dos produtos dentro do array
  return NextResponse.json(orders);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newOrder = await Order.create(data);
  return NextResponse.json(newOrder, { status: 201 });
}