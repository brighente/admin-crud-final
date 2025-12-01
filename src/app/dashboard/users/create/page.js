'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
    const router = useRouter();
    const [form, setForm] = useState({ nome: '', email: '', perfil: 'ADMIN' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if(res.ok) {
                alert('Usuário criado com sucesso!');
                router.push('/dashboard/users');
            } else {
                alert(`Erro: ${data.message || data.error}`);
                console.error("Erro detalhado:", data);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error(error);
        }
        
        setLoading(false);
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Usuário</h1>
            
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nome</label>
                            <input 
                                type="text" 
                                placeholder="Digite o nome"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500"
                                value={form.nome}
                                onChange={e => setForm({...form, nome: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nome de Usuário (Login)</label>
                            <input 
                                type="text" 
                                placeholder="Digite o login"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500"
                                value={form.email.split('@')[0]} 
                                onChange={() => {}}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">E-mail</label>
                            <input 
                                type="email" 
                                placeholder="Digite o e-mail"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Senha</label>
                            <input 
                                type="text" 
                                placeholder="Gerada Automaticamente"
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Perfil</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500 bg-white" value={form.perfil}onChange={e => setForm({...form, perfil: e.target.value})} required>
                                <option value="ADMIN">Administrador</option>
                                <option value="LOJA">Loja</option>
                                <option value="FORNECEDOR">Fornecedor</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium transition-colors"> {loading ? 'Salvando...' : 'Salvar'} </button>
                    </div>

                </form>
            </div>
        </div>
    );
}