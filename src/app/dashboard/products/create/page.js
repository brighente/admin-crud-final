'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([]); // Lista para o Select
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({ 
        nome: '', valor: '', estoque: '', categoria: '', id_fornecedor: '', foto: '' 
    });

    // 1. Busca os fornecedores ao carregar a página
    useEffect(() => {
        fetch('/api/suppliers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setSuppliers(data);
            })
            .catch(err => console.error("Erro ao buscar fornecedores:", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ajuste: O select salva no state como 'id_fornecedor', mas a API espera 'fornecedor'
        const payload = {
            ...form,
            fornecedor: form.id_fornecedor // Renomeando para bater com a API
        };

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                alert('Produto cadastrado com sucesso!');
                router.push('/dashboard/products');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (err) {
            alert('Erro de conexão.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Produto</h1>
        
        <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm mb-1">Nome do Produto</label>
                    <input name="nome" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required placeholder="Ex: Cimento Votoran" />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm mb-1">Valor Unitário (R$)</label>
                    <input name="valor" type="number" step="0.01" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required placeholder="0.00" />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm mb-1">Estoque (Qtd)</label>
                    <input name="estoque" type="number" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required placeholder="0" />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm mb-1">Categoria</label>
                    <select name="categoria" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none">
                        <option value="Eletrônicos">Material Básico</option>
                        <option value="Móveis">Hidráulica</option>
                        <option value="Alimentos">Elétrica</option>
                        <option value="Roupas">Pisos e Revestimentos</option>
                        <option value="Outros">Pintura</option>
                        <option value="Outros">Ferramentas</option>
                        <option value="Outros">Louças e Metais</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm mb-1">Fornecedor Responsável</label>
                    <select name="id_fornecedor" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none" required>
                        <option value="">Selecione o Fornecedor</option>
                        {suppliers.map(sup => (
                            <option key={sup._id} value={sup._id}>
                                {sup.supplier_name} ({sup.cnpj})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm mb-1">Foto (URL)</label>
                    <input name="foto" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" placeholder="http://..." />
                </div>

            </div>

            <button type="submit" disabled={loading} className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium transition-colors">
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
            </form>
        </div>
        </div>
    );
}