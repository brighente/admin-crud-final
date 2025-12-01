import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Campaign from '@/models/campaign';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const campaign = await Campaign.findById(id).populate('supplier_id');
  return NextResponse.json(campaign);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    // TRADUÇÃO
    const updateData = {
        name: data.descricao,
        sales_goal: parseFloat(data.meta),
        duration_days: parseInt(data.duracao),
        supplier_id: data.id_fornecedor
    };

    const updated = await Campaign.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Campaign.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado' });
}