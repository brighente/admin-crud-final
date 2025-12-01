import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Campaign from '@/models/campaign';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const campaign = await Campaign.findById(id).populate('supplier_id');
    if (!campaign) return NextResponse.json({ error: 'Campanha não encontrada' }, { status: 404 });
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const data = await req.json();
    
    // Tratamento opcional se o front mandar nomes antigos na edição
    const updateData = { ...data };
    if(data.descricao) updateData.name = data.descricao;
    if(data.meta) updateData.sales_goal = data.meta;
    if(data.duracao) updateData.duration_days = data.duracao;

    const updated = await Campaign.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await

  try {
    await Campaign.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}