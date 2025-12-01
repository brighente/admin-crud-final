'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProduct() {
    const { id } = useParams();
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [form, setForm] = useState({ 
        nome: '', valor: '', estoque: '', categoria: '', id_fornecedor: '', foto: '' 
    });

    useEffect(() => {
        // Carrega fornecedores e o produto atual
        Promise.all([
            fetch('/api/suppliers').then(res => res.json()),
            fetch(`/api/products/${id}`).then(res => res.json())
        ]).then(([dataSuppliers, dataProduct]) => {
            setSuppliers(dataSuppliers);
            setForm({
                nome: dataProduct.name,
                valor: dataProduct.price,
                estoque: dataProduct.stock_quantity,
                categoria: dataProduct.category,
                // Se o supplier_id vier populado (objeto), pega o _id. Se vier string, usa ela.
                id_fornecedor: dataProduct.supplier_id?._id || dataProduct.supplier_id,
                foto: dataProduct.image || ''
            });
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mapeia de volta para o que a API espera
        const payload = {
            nome: form.nome,
            valor: form.valor,
            estoque: form.estoque,
            categoria: form.categoria,
            id_fornecedor: form.id_fornecedor,
            foto: form.foto
        };

        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if(res.ok) {
            alert('Produto atualizado!');
            router.push('/dashboard/products');
        } else {
            alert('Erro ao atualizar');
        }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Produto</h1>
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm mb-1">Nome</label>
                            <input name="nome" value={form.nome} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Valor</label>
                            <input name="valor" type="number" step="0.01" value={form.valor} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Estoque</label>
                            <input name="estoque" type="number" value={form.estoque} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Categoria</label>
                            <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                                <option value="Eletrônicos">Eletrônicos</option>
                                <option value="Móveis">Móveis</option>
                                <option value="Alimentos">Alimentos</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Fornecedor</label>
                            <select name="id_fornecedor" value={form.id_fornecedor} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                                {suppliers.map(s => <option key={s._id} value={s._id}>{s.supplier_name}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm mb-1">Foto URL</label>
                            <input name="foto" value={form.foto} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Salvar</button>
                </form>
            </div>
        </div>
    );
}