'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSupplier() {
    const router = useRouter();
    const [form, setForm] = useState({ 
        cnpj: '', nome_fantasia: '', razao_social: '', email: '', telefone: '' 
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({
        ...form, 
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            
            const data = await res.json();
            
            if(res.ok) {
                alert('Fornecedor cadastrado com sucesso!');
                router.push('/dashboard/suppliers'); 
            } else {
                alert('Erro: ' + (data.message || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Fornecedor</h1>
            
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">CNPJ</label>
                            <input name="cnpj" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500" placeholder="00.000.000/0001-00" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Telefone</label>
                            <input name="telefone" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500" placeholder="(00) 00000-0000" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">E-mail</label>
                            <input name="email" type="email" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nome Fantasia</label>
                            <input name="nome_fantasia" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Razão Social</label>
                            <input name="razao_social" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500" required/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" disabled={loading} className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium transition-colors"> {loading ? 'Salvando...' : 'Salvar'} </button>
                    </div>

                </form>
            </div>
        </div>
  );
}