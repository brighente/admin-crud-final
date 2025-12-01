import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Store from '@/models/store';

export async function GET() {
  await connectDB();
  const stores = await Store.find({});
  return NextResponse.json(stores);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newStore = await Store.create(data);
  return NextResponse.json(newStore, { status: 201 });
}