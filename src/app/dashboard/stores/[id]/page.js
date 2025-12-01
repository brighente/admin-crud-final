'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditStore() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        cnpj: '', nome_fantasia: '', razao_social: '', email: '', telefone: '',
        logradouro: '', numero: '', bairro: '', cidade: '', estado: '', cep: ''
    });

    useEffect(() => {
        fetch(`/api/stores/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    nome_fantasia: data.store_name,
                    razao_social: data.corporate_reason,
                    cnpj: data.cnpj,
                    email: data.contact_email,
                    telefone: data.phone_number,
                    logradouro: data.address?.street || '',
                    numero: data.address?.number || '',
                    bairro: data.address?.district || '',
                    cidade: data.address?.city || '',
                    estado: data.address?.state || '',
                    cep: data.address?.zip_code || ''
                });
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/stores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            alert('Loja atualizada!');
            router.push('/dashboard/stores');
        } else {
            alert('Erro ao atualizar.');
        }
    };

    const estados = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Loja</h1>
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
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}