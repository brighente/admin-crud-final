'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StoresList() {
    const [stores, setStores] = useState([]);
    const router = useRouter();

    const fetchStores = () => {
        fetch('/api/stores')
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)) {
                    setStores(data);
                } else {
                    console.error("Erro dados:", data);
                    setStores([]);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => { 
        fetchStores(); 
    }, []);

    const handleDelete = async (id) => {
        if(!confirm('Tem certeza que deseja excluir esta loja?')) return;
        
        // CORREÇÃO: URL dinâmica /id
        const res = await fetch(`/api/stores/${id}`, { 
            method: 'DELETE' 
        });

        if (res.ok) {
            fetchStores();
        } else {
            alert('Erro ao excluir loja.');
        }
    }

    const handleEdit = (id) => {
        router.push(`/dashboard/stores/${id}`);
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Lojas Parceiras</h1>
                <Link 
                href="/dashboard/stores/create" 
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition flex items-center gap-2"
                > + Nova Loja </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Loja</th>
                            <th className="py-3 px-6 text-left">CNPJ</th>
                            <th className="py-3 px-6 text-left">Contato</th>
                            <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {stores.map((store) => (
                        <tr key={store._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-xs text-gray-400">
                                ...{store._id.slice(-6)}
                            </td>
                            <td className="py-3 px-6">
                                <div className="font-bold text-gray-700">{store.store_name}</div>
                                <div className="text-xs text-gray-400">{store.corporate_reason}</div>
                                {/* Mostra cidade/UF se existir o endereço */}
                                {store.address && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {store.address.city}/{store.address.state}
                                    </div>
                                )}
                            </td>
                            <td className="py-3 px-6">{store.cnpj}</td>
                            <td className="py-3 px-6">
                                <div>{store.contact_email}</div>
                                <div className="text-xs text-gray-500">{store.phone_number}</div>
                            </td>
                            <td className="py-3 px-6 text-center flex justify-center gap-3">
                                <button 
                                    onClick={() => handleEdit(store._id)} 
                                    className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110"
                                > ✏️ </button>
                                <button 
                                    onClick={() => handleDelete(store._id)} 
                                    className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                                > 🗑️ </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                
                {stores.length === 0 && (
                    <div className="p-6 text-center text-gray-500">Nenhuma loja cadastrada.</div>
                )}
            </div>
        </div>
    );
}