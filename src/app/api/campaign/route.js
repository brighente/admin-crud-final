import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Campaign from '@/models/campaign';

export async function GET() {
  await connectDB();
  try {
    const campaigns = await Campaign.find({}).populate('supplier_id');
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const { descricao, meta, duracao, id_fornecedor } = body;

    if (!descricao || !meta || !duracao || !id_fornecedor) {
      return NextResponse.json(
        { message: 'Preencha todos os campos obrigatórios.' }, 
        { status: 400 }
      );
    }

    const newCampaign = new Campaign({
      name: descricao,
      supplier_id: id_fornecedor,
      sales_goal: parseFloat(meta),
      duration_days: parseInt(duracao),
      start_date: new Date()
    });

    await newCampaign.save();

    return NextResponse.json({ 
      message: 'Campanha criada com sucesso!', 
      campaign: newCampaign 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}