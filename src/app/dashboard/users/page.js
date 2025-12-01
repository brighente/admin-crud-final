'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const fetchUsers = () => {
        fetch('/api/users').then(res => res.json()).then(data => setUsers(data));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir?')) return;

        await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        fetchUsers();
  }

    return (
    <div className="container mx-auto">
        {/* Header do Card */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Usuários do Sistema</h1>
            <Link 
            href="/dashboard/users/create" 
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition flex items-center gap-2"
            > + Novo Usuário </Link>
        </div>

        {/* Card da Tabela */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nome</th>
                    <th className="py-3 px-6 text-left">E-mail</th>
                    <th className="py-3 px-6 text-center">Perfil</th>
                    <th className="py-3 px-6 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{user.id}</td>
                        <td className="py-3 px-6 text-left">{user.nome || 'Sem nome'}</td>
                        <td className="py-3 px-6 text-left">{user.email}</td>
                        <td className="py-3 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                user.perfil === 'ADMIN' ? 'bg-purple-200 text-purple-700' :
                                user.perfil === 'LOJA' ? 'bg-blue-200 text-blue-700' :
                                'bg-orange-200 text-orange-700'
                            }`}> {user.perfil} </span>
                        </td>
                        <td className="py-3 px-6 text-center flex justify-center gap-3">
                            <button className="text-blue-500 hover:text-blue-700">✏️</button>
                            <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}