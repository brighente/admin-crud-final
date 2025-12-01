import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Store from '@/models/store';

export async function GET() {
  await connectDB();
  try {
    const stores = await Store.find({});
    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { 
      nome_fantasia, razao_social, cnpj, email, telefone,
      logradouro, numero, bairro, cidade, estado, cep 
    } = body;

    if (!nome_fantasia || !cnpj || !email) {
      return NextResponse.json(
        { message: 'Campos obrigatórios: Nome Fantasia, CNPJ e E-mail.' }, 
        { status: 400 }
      );
    }

    const storeExists = await Store.findOne({ cnpj: cnpj });
    if (storeExists) {
      return NextResponse.json(
        { message: 'Já existe uma loja com este CNPJ.' }, 
        { status: 409 }
      );
    }

    const newStore = new Store({
      store_name: nome_fantasia,
      corporate_reason: razao_social,
      cnpj: cnpj,
      contact_email: email,
      phone_number: telefone,
      address: {
        street: logradouro,
        number: numero,
        district: bairro,
        city: cidade,
        state: estado,
        zip_code: cep
      },
      status: 'on'
    });

    await newStore.save();

    return NextResponse.json({ 
      message: 'Loja criada com sucesso!', 
      store: newStore 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro criar loja:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}