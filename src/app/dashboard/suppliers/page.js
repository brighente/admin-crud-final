'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuppliersList() {
    const [suppliers, setSuppliers] = useState([]);
    const router = useRouter();

    const fetchSuppliers = () => {
        fetch('/api/suppliers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSuppliers(data);
                } else {
                    console.error("Erro ao buscar:", data);
                    setSuppliers([]);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => { 
        fetchSuppliers(); 
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;
        
        const res = await fetch(`/api/suppliers/${id}`, { 
            method: 'DELETE' 
        });

        if (res.ok) {
            fetchSuppliers();
        } else {
            const data = await res.json();
            alert("Erro: " + (data.message || "Não foi possível excluir."));
        }
    }

    const handleEdit = (id) => {
        router.push(`/dashboard/suppliers/${id}`);
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Fornecedores</h1>
                <Link 
                    href="/dashboard/suppliers/create" 
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
                > + Novo Fornecedor </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-6 text-left"> ID </th>
                        <th className="py-3 px-6 text-left"> Empresa </th>
                        <th className="py-3 px-6 text-left"> CNPJ </th>
                        <th className="py-3 px-6 text-left"> Email/Tel </th>
                        <th className="py-3 px-6 text-center"> Ações </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {suppliers.map((sup) => (
                    <tr key={sup._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6 text-xs text-gray-400"> 
                            ...{sup._id.slice(-6)} 
                        </td>
                        <td className="py-3 px-6">
                            {/* Campos corrigidos conforme o Model em inglês */}
                            <div className="font-bold text-gray-700"> {sup.supplier_name} </div>
                            <div className="text-xs text-gray-400"> {sup.corporate_reason} </div>
                        </td>
                        <td className="py-3 px-6">{sup.cnpj}</td>
                        <td className="py-3 px-6">
                            <div>{sup.contact_email}</div>
                            <div className="text-xs text-gray-500">{sup.phone_number}</div>
                        </td>
                        <td className="py-3 px-6 text-center flex justify-center gap-3">
                            <button 
                                onClick={() => handleEdit(sup._id)} 
                                className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110"
                            > ✏️ </button>
                            <button 
                                onClick={() => handleDelete(sup._id)} 
                                className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                            > 🗑️ </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                {suppliers.length === 0 && (
                    <div className="p-6 text-center text-gray-500">Nenhum fornecedor cadastrado.</div>
                )}
            </div>
        </div>
    );
}