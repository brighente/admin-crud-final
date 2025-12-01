import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Store from '@/models/store';
import Order from '@/models/order';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const store = await Store.findById(id);
  return NextResponse.json(store);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    // TRADUÇÃO E ESTRUTURAÇÃO DO ENDEREÇO
    const updateData = {
        store_name: data.nome_fantasia,
        corporate_reason: data.razao_social,
        cnpj: data.cnpj,
        contact_email: data.email,
        phone_number: data.telefone,
        address: {
            street: data.logradouro,
            number: data.numero,
            district: data.bairro,
            city: data.cidade,
            state: data.estado,
            zip_code: data.cep
        }
    };

    const updated = await Store.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const ordersCount = await Order.countDocuments({ store_id: id });
    
    if (ordersCount > 0) {
      return NextResponse.json(
        { message: `Esta loja possui ${ordersCount} pedidos registrados. Não é possível excluir.` }, 
        { status: 409 }
      );
    }

    await Store.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Loja deletada com sucesso.' });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}