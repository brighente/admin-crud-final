import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Campaign from '@/models/campaign';

export async function GET() {
  await connectDB();
  const campaigns = await Campaign.find({}).populate('supplier_id');
  return NextResponse.json(campaigns);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCampaign = await Campaign.create(data);
  return NextResponse.json(newCampaign, { status: 201 });
}