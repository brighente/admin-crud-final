'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Se der erro de 'Module not found' nos ícones, instale: npm install react-icons
import { FaPlus, FaTrash, FaPen, FaBox } from 'react-icons/fa';

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    const fetchProducts = () => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Erro dados:", data);
                    setProducts([]);
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchProducts(); }, []);

    const formatCurrency = (val) => {
        if (!val) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const handleDelete = async (id) => {
        if(!confirm("Deseja excluir este produto?")) return;
        
        // CORREÇÃO: URL dinâmica /id
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        
        if(res.ok) {
            fetchProducts();
        } else {
            alert("Erro ao excluir");
        }
    };

    const handleEdit = (id) => {
        router.push(`/dashboard/products/${id}`);
    }

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
                        <th className="py-3 px-6 text-center">Estoque</th>
                        <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {products.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-6">Nenhum produto cadastrado.</td></tr>
                        ) : products.map((prod) => (
                        <tr key={prod._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6">
                                {/* Lógica: Se tiver imagem, mostra. Se não, mostra ícone */}
                                {prod.image ? (
                                    <img src={prod.image} alt={prod.name} className="h-10 w-10 object-cover rounded border" />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                        <FaBox />
                                    </div>
                                )}
                            </td>
                            <td className="py-3 px-6 font-bold text-gray-700">{prod.name}</td>
                            <td className="py-3 px-6">
                                <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">
                                    {prod.category || 'Geral'}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-xs">
                                {/* Acessa o objeto populado do fornecedor */}
                                {prod.supplier_id?.supplier_name || <span className="text-red-400">Sem Fornecedor</span>}
                            </td>
                            <td className="py-3 px-6 text-center font-bold text-green-700">
                                {formatCurrency(prod.price)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {prod.stock_quantity}
                            </td>
                            <td className="py-3 px-6 text-center flex justify-center gap-3">
                                <button onClick={() => handleEdit(prod._id)} className="text-blue-500 hover:text-blue-700 transition">
                                    <FaPen />
                                </button>
                                <button onClick={() => handleDelete(prod._id)} className="text-red-500 hover:text-red-700 transition">
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