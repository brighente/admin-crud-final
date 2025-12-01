import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Campaign from '@/models/campaign';

export async function GET(req, { params }) {
  await connectDB();
  const campaign = await Campaign.findById(params.id);
  return NextResponse.json(campaign);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Campaign.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Campaign.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deletado' });
}