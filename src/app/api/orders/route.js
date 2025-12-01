import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';
import Product from '@/models/product'; // Importante para validar estoque futuro

export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find({})
      .populate('store_id')
      .populate('supplier_id')
      .populate('items.product_id')
      .sort({ createdAt: -1 }); // Mais recentes primeiro
      
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id_loja, id_fornecedor, itens } = body;

    // Validação Básica
    if (!id_loja || !id_fornecedor || !itens || itens.length === 0) {
      return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 });
    }

    // Calcular o total no backend (mais seguro)
    let totalGeral = 0;
    
    // Traduzir itens para o formato do Schema
    const orderItems = itens.map(item => {
      totalGeral += item.total;
      return {
        product_id: item.id_produto,
        quantity: item.quantidade,
        unit_price: item.valor_unitario
      };
    });

    const newOrder = new Order({
      store_id: id_loja,
      supplier_id: id_fornecedor,
      items: orderItems,
      total_amount: totalGeral,
      status: 'Pending'
    });

    await newOrder.save();

    return NextResponse.json({ 
      message: 'Pedido realizado com sucesso!', 
      order: newOrder 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}