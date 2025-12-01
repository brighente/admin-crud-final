'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateStore() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        cnpj: '', nome_fantasia: '', razao_social: '', email: '', telefone: '',
        logradouro: '', numero: '', bairro: '', cidade: '', estado: 'SC', cep: ''
    });

    const handleChange = (e) => {
        setForm({ 
            ...form, 
            [e.target.name]: e.target.value 
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/stores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                alert('Loja cadastrada com sucesso!');
                router.push('/dashboard/stores');
            } else {
                alert(`Erro: ${data.message}`);
            }

        } catch(err) {
            console.error(err);
            alert('Erro de conexão ao criar loja.');
        } finally {
            setLoading(false);
        }
    };

    const estados = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Comércio (Loja)</h1>
        
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-1">Dados Gerais</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Nome Fantasia</label>
                        <input name="nome_fantasia" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">CNPJ</label>
                        <input name="cnpj" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">E-mail</label>
                        <input name="email" type="email" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                </div>

                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-1">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-1">
                        <label className="block text-gray-700 text-sm mb-1">CEP</label>
                        <input name="cep" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Logradouro</label>
                        <input name="logradouro" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-gray-700 text-sm mb-1">Número</label>
                        <input name="numero" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-gray-700 text-sm mb-1">Bairro</label>
                        <input name="bairro" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none"  required/>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-gray-700 text-sm mb-1">Cidade</label>
                        <input name="cidade" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" required />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-gray-700 text-sm mb-1">Estado</label>
                        <select name="estado" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none" required>
                            {estados.map((uf) => (
                                <option key={uf} value={uf}> {uf} </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={loading} className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium transition-colors">
                    Salvar
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}