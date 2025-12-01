import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const product = await Product.findById(id).populate('supplier_id');
    
    if (!product) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    const data = await req.json();
    
    // Se o front mandar os dados em português, precisamos traduzir aqui também
    // Mas assumindo que a tela de edição usará o mesmo padrão do create,
    // o ideal é que o front já mande em inglês. Se mandar misturado, ajustamos:
    
    const updateData = { ...data };
    
    // Tratamento de segurança caso venha 'id_fornecedor' em vez de 'supplier_id'
    if (data.id_fornecedor) updateData.supplier_id = data.id_fornecedor;
    if (data.nome) updateData.name = data.nome;
    if (data.valor) updateData.price = data.valor;
    if (data.estoque) updateData.stock_quantity = data.estoque;

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params; // Correção do await
  
  try {
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}