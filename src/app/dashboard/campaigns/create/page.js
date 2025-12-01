'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Estado do formulário
    const [form, setForm] = useState({
        descricao: '',
        meta: '',
        duracao: '',
        id_fornecedor: ''
    });

    // Busca fornecedores ao carregar
    useEffect(() => {
        fetch('/api/suppliers')
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)) setSuppliers(data);
            })
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                alert('Campanha criada com sucesso!');
                router.push('/dashboard/campaigns');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            alert('Erro de conexão.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Campanha</h1>
            
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm mb-1">Descrição da Campanha</label>
                            <input 
                                name="descricao" 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" 
                                placeholder="Ex: Black Friday 2025" 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Meta de Vendas (R$)</label>
                            <input 
                                name="meta" 
                                type="number" 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Duração (Dias)</label>
                            <input 
                                name="duracao" 
                                type="number" 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Fornecedor</label>
                            <select 
                                name="id_fornecedor" 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none"
                                required
                            >
                                <option value="">Selecione</option>
                                {suppliers.map(sup => (
                                    <option key={sup._id} value={sup._id}>{sup.supplier_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium transition-colors"
                    > 
                        {loading ? 'Salvando...' : 'Salvar'} 
                    </button>
                </form>
            </div>
        </div>
    );
}