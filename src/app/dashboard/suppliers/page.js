'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SuppliersList() {
    const [suppliers, setSuppliers] = useState([]);

    const fetchSuppliers = () => {
        fetch('/api/suppliers').then(res => res.json()).then(data => setSuppliers(data));
    }

    useEffect(() => { 
        fetchSuppliers(); 
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Excluir fornecedor?')) return;
        await fetch(`/api/suppliers?id=${id}`, { 
            method: 'DELETE' 
        });

        fetchSuppliers();
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Fornecedores</h1>
                <Link href="/dashboard/suppliers/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"> + Novo Fornecedor </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-6 text-left"> ID </th>
                        <th className="py-3 px-6 text-left"> Empresa </th>
                        <th className="py-3 px-6 text-left"> CNPJ </th>
                        <th className="py-3 px-6 text-left"> Email </th>
                        <th className="py-3 px-6 text-center"> Ações </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {suppliers.map((sup) => (
                    <tr key={sup.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6"> {sup.id} </td>
                        <td className="py-3 px-6">
                            <div className="font-bold"> {sup.nome_fantasia} </div>
                            <div className="text-xs text-gray-400"> {sup.razao_social} </div>
                        </td>
                        <td className="py-3 px-6">{sup.cnpj}</td>
                        <td className="py-3 px-6">{sup.email_fornecedor}</td>
                        <td className="py-3 px-6 text-center">
                            <button onClick={() => handleDelete(sup.id)} className="text-red-500 hover:text-red-700"> 🗑️ </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}