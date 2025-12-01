'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditSupplier() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({ 
        cnpj: '', nome_fantasia: '', razao_social: '', email: '', telefone: '' 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/suppliers/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    cnpj: data.cnpj,
                    nome_fantasia: data.supplier_name,
                    razao_social: data.corporate_reason, 
                    email: data.contact_email,
                    telefone: data.phone_number
                });
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/suppliers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        
        if(res.ok) {
            alert('Fornecedor atualizado!');
            router.push('/dashboard/suppliers');
        } else {
            alert('Erro ao atualizar');
        }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Fornecedor</h1>
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">CNPJ</label>
                            <input name="cnpj" value={form.cnpj} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Telefone</label>
                            <input name="telefone" value={form.telefone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">E-mail</label>
                            <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none" required/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nome Fantasia</label>
                            <input name="nome_fantasia" value={form.nome_fantasia} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Razão Social</label>
                            <input name="razao_social" value={form.razao_social} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none" required/>
                        </div>
                    </div>
                    <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-medium">Atualizar</button>
                </form>
            </div>
        </div>
    );
}