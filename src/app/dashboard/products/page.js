'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaTrash, FaBox } from 'react-icons/fa';

export default function ProductsList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch('/api/products').then(res => res.json()).then(data => setProducts(data)).catch(err => console.error(err));
    };

    useEffect(() => { fetchProducts(); }, []);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const handleDelete = async (id) => {
        if(!confirm("Deseja excluir este produto?")) return;
        const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        if(res.ok) fetchProducts();
        else alert("Erro ao excluir");
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Catálogo de Produtos</h1>
                <Link 
                href="/dashboard/products/create" 
                className="bg-[#009933] hover:bg-[#007a29] text-white px-4 py-2 rounded shadow transition flex items-center gap-2"
                >
                <FaPlus size={12}/> Novo Produto
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-6 text-left">Imagem</th>
                        <th className="py-3 px-6 text-left">Produto</th>
                        <th className="py-3 px-6 text-left">Categoria</th>
                        <th className="py-3 px-6 text-left">Fornecedor</th>
                        <th className="py-3 px-6 text-center">Valor</th>
                        <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {products.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-6">Nenhum produto cadastrado.</td></tr>
                        ) : products.map((prod) => (
                        <tr key={prod.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6">
                                {/* Placeholder para imagem se for null ou blob complexo */}
                                <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                    <FaBox />
                                </div>
                            </td>
                            <td className="py-3 px-6 font-bold text-gray-700">{prod.produto}</td>
                            <td className="py-3 px-6">
                                <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">
                                    {prod.nome_categoria || 'Geral'}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-xs">{prod.nome_fornecedor}</td>
                            <td className="py-3 px-6 text-center font-bold text-green-700">
                                {formatCurrency(prod.valor_produto)}
                            </td>
                            <td className="py-3 px-6 text-center">
                            <button onClick={() => handleDelete(prod.id)} className="text-red-500 hover:text-red-700 transition">
                                <FaTrash />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}