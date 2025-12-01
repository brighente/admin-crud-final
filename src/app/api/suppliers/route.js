import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Supplier from '@/models/supplier';

export async function GET() {
  await connectDB();
  try {
    const suppliers = await Supplier.find({});
    return NextResponse.json(suppliers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { nome_fantasia, razao_social, cnpj, email, telefone } = body;

    if (!nome_fantasia || !cnpj || !email || !telefone) {
      return NextResponse.json(
        { message: 'Preencha os campos obrigatórios (Nome, CNPJ, Email, Telefone).' },
        { status: 400 }
      );
    }

    const supplierExists = await Supplier.findOne({ cnpj: cnpj });
    if (supplierExists) {
      return NextResponse.json(
        { message: 'Fornecedor com este CNPJ já cadastrado.' },
        { status: 409 }
      );
    }

    const newSupplier = new Supplier({
      supplier_name: nome_fantasia,
      corporate_reason: razao_social,
      cnpj: cnpj,
      contact_email: email,
      phone_number: telefone,
      supplier_category: 'Geral',
      status: 'on'
    });

    await newSupplier.save();

    return NextResponse.json({ 
      message: 'Fornecedor criado com sucesso!', 
      supplier: newSupplier 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    if (error.code === 11000) {
        return NextResponse.json({ message: 'Já existe um registro com este CNPJ ou Email.' }, { status: 409 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}