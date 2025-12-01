import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Order from '@/models/order';
import Product from '@/models/product';
import Store from '@/models/store';     
import Supplier from '@/models/supplier'; 

export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find({})
      .populate('store_id')      // Preenche dados da loja
      .populate('supplier_id')   // Preenche dados do fornecedor
      .populate('items.product_id') // Preenche dados do produto
      .sort({ createdAt: -1 });
      
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error); 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id_loja, id_fornecedor, itens } = body;

    if (!id_loja || !id_fornecedor || !itens || itens.length === 0) {
      return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 });
    }

    let totalGeral = 0;
    
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