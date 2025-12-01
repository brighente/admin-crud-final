import { NextResponse } from 'next/server';
import connectDB from '@/db';
import User from '@/models/user';

// GET (Mantém igual)
export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  try {
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'ID Inválido' }, { status: 400 });
  }
}

// PUT (CORRIGIDO: TRADUÇÃO DOS CAMPOS)
export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const data = await req.json(); // Recebe: { nome, email, perfil }

    // Objeto de atualização traduzido
    const updateData = {
        name: data.nome,
        contact_email: data.email,
        level: data.perfil
        // Nota: Não atualizamos senha/user aqui por segurança, a menos que queira
    };

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE (Mantém igual)
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deletado com sucesso' });
}