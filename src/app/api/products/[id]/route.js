import { NextResponse } from 'next/server';
import connectDB from '@/db';
import Product from '@/models/product';
import Order from '@/models/order';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id).populate('supplier_id');
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json();

    const updateData = {
        name: data.nome,
        price: parseFloat(data.valor),
        stock_quantity: parseInt(data.estoque),
        category: data.categoria,
        supplier_id: data.id_fornecedor,
        image: data.foto
    };

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const ordersWithProduct = await Order.countDocuments({ "items.product_id": id });

    if (ordersWithProduct > 0) {
        return NextResponse.json(
          { message: `Este produto faz parte de ${ordersWithProduct} pedidos realizados. Impossível excluir.` }, 
          { status: 409 }
        );
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deletado com sucesso' });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}