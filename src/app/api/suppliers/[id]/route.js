import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';
import Product from '@/models/product';
import Campaign from '@/models/campaign';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const supplier = await Supplier.findById(id);
  return NextResponse.json(supplier);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    // TRADUÇÃO
    const updateData = {
        supplier_name: data.nome_fantasia,
        corporate_reason: data.razao_social,
        cnpj: data.cnpj,
        contact_email: data.email,
        phone_number: data.telefone
    };

    const updated = await Supplier.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const productsCount = await Product.countDocuments({ supplier_id: id });
    if (productsCount > 0) {
      return NextResponse.json(
        { message: `Não é possível deletar! Existem ${productsCount} produtos vinculados a este fornecedor.` }, 
        { status: 409 }
      );
    }

    const campaignsCount = await Campaign.countDocuments({ supplier_id: id });
    if (campaignsCount > 0) {
        return NextResponse.json(
          { message: `Não é possível deletar! Existem campanhas ativas para este fornecedor.` }, 
          { status: 409 }
        );
      }

    await Supplier.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Fornecedor deletado com sucesso.' });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}