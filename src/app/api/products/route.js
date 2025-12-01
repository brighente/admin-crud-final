import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';

export async function GET() {
  await connectDB();
  try {
    // Populate busca os dados completos do fornecedor usando o ID salvo
    const products = await Product.find({}).populate('supplier_id'); 
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Tradução dos campos do formulário para o Model
    const { nome, valor, estoque, categoria, fornecedor, foto } = body;

    if (!nome || !valor || !estoque || !fornecedor) {
      return NextResponse.json(
        { message: 'Preencha Nome, Valor, Estoque e Fornecedor.' },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name: nome,
      price: parseFloat(valor),
      stock_quantity: parseInt(estoque),
      category: categoria,
      supplier_id: fornecedor, // O ID que vem do select
      image: foto,
      status: 'on'
    });

    await newProduct.save();

    return NextResponse.json({ 
      message: 'Produto criado com sucesso!', 
      product: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}