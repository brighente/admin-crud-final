'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const fetchUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Erro no formato dos dados:", data);
                }
            })
            .catch(err => console.error("Erro na requisição:", err));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

        try {
            const res = await fetch(`/api/users/${id}`, { 
                method: 'DELETE' 
            });

            if (res.ok) {
                alert('Usuário deletado com sucesso!');
                fetchUsers(); // Recarrega a lista sem precisar dar F5
            } else {
                const errorData = await res.json();
                alert(`Erro ao deletar: ${errorData.error || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão ao tentar deletar.');
        }
    }

    const handleEdit = (id) => {
        router.push(`/dashboard/users/${id}`);
    }

    return (
    <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Usuários do Sistema</h1>
            <Link 
            href="/dashboard/users/create" 
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition flex items-center gap-2"
            > + Novo Usuário </Link>
        </div>

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
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium text-xs text-gray-400">
                            ...{user._id.slice(-6)}
                        </td>
                        
                        <td className="py-3 px-6 text-left font-bold text-gray-700">{user.name}</td>
                        <td className="py-3 px-6 text-left">{user.contact_email}</td>
                        
                        <td className="py-3 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                user.level === 'ADMIN' ? 'bg-purple-200 text-purple-700' :
                                user.level === 'LOJA' ? 'bg-blue-200 text-blue-700' :
                                'bg-orange-200 text-orange-700'
                            }`}> {user.level} </span>
                        </td>
                        
                        <td className="py-3 px-6 text-center flex justify-center gap-3">
                            <div className="flex items-center justify-center gap-4">
                                <button 
                                    onClick={() => handleEdit(user._id)} 
                                    className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110 p-1"
                                    title="Editar"> <FaPen size={18} /> </button>

                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="text-red-500 hover:text-red-700 transition transform hover:scale-110 p-1"
                                    title="Excluir"> <FaTrash size={18} /> </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
            {users.length === 0 && (
                <div className="p-8 text-center text-gray-500 bg-gray-50">
                    Nenhum usuário encontrado.
                </div>
            )}
        </div>
    </div>
  );
}