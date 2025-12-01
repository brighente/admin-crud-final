'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUser() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({ nome: '', email: '', perfil: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Busca os dados do usuário para preencher o form
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                // Traduz do Banco (Inglês) para o Form (Português)
                setForm({
                    nome: data.name,
                    email: data.contact_email,
                    perfil: data.level
                });
                setLoading(false);
            })
            .catch(err => alert("Erro ao carregar usuário"));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if(res.ok) {
            alert('Usuário atualizado!');
            router.push('/dashboard/users');
        } else {
            alert('Erro ao atualizar');
        }
    }

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Usuário</h1>
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nome</label>
                            <input 
                                type="text" 
                                value={form.nome}
                                onChange={e => setForm({...form, nome: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">E-mail</label>
                            <input 
                                type="email" 
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Perfil</label>
                            <select 
                                value={form.perfil}
                                onChange={e => setForm({...form, perfil: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white outline-none"
                            >
                                <option value="ADMIN">Administrador</option>
                                <option value="LOJA">Loja</option>
                                <option value="FORNECEDOR">Fornecedor</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">Atualizar</button>
                </form>
            </div>
        </div>
    );
}