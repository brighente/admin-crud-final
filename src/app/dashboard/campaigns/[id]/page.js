'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCampaign() {
    const { id } = useParams();
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [form, setForm] = useState({ descricao: '', meta: '', duracao: '', id_fornecedor: '' });

    useEffect(() => {
        Promise.all([
            fetch('/api/suppliers').then(res => res.json()),
            fetch(`/api/campaign/${id}`).then(res => res.json())
        ]).then(([dataSuppliers, dataCamp]) => {
            setSuppliers(dataSuppliers);
            setForm({
                descricao: dataCamp.name,
                meta: dataCamp.sales_goal,
                duracao: dataCamp.duration_days,
                id_fornecedor: dataCamp.supplier_id?._id || dataCamp.supplier_id
            });
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/campaign/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if(res.ok) {
            alert('Campanha atualizada!');
            router.push('/dashboard/campaigns');
        } else {
            alert('Erro ao atualizar');
        }
    }

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    if(loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Campanha</h1>
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="col-span-2">
                            <label className="block text-sm mb-1">Descrição</label>
                            <input name="descricao" value={form.descricao} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Meta (R$)</label>
                            <input name="meta" type="number" value={form.meta} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Duração (Dias)</label>
                            <input name="duracao" type="number" value={form.duracao} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Fornecedor</label>
                            <select name="id_fornecedor" value={form.id_fornecedor} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                                {suppliers.map(s => <option key={s._id} value={s._id}>{s.supplier_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Atualizar</button>
                </form>
            </div>
        </div>
    );
}