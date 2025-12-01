'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            if (Array.isArray(data)) setOrders(data);
            else setOrders([]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
    };

    const getStatusBadge = (status) => {
        const map = {
            'Pending':   { label: 'PENDENTE', class: 'bg-yellow-100 text-yellow-800' },
            'Confirmed': { label: 'CONFIRMADO', class: 'bg-blue-100 text-blue-800' },
            'Shipped':   { label: 'ENVIADO', class: 'bg-indigo-100 text-indigo-800' },
            'Delivered': { label: 'ENTREGUE', class: 'bg-green-100 text-green-800' },
            'Cancelled': { label: 'CANCELADO', class: 'bg-red-100 text-red-800' }
        };

        const current = map[status] || { label: status, class: 'bg-gray-100 text-gray-600' };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${current.class}`}>
                {current.label}
            </span>
        );
    };

    const handleDelete = async (id) => {
        if(!confirm("Tem certeza que deseja excluir/cancelar este pedido?")) return;
        
        const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        
        if (res.ok) {
            fetchOrders();
        } else {
            alert("Erro ao excluir pedido.");
        }
    };

    const handleView = (id) => {
        router.push(`/dashboard/orders/${id}`);
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Gestão de Pedidos</h1>
                <Link 
                    href="/dashboard/orders/create" 
                    className="bg-[#009933] hover:bg-[#007a29] text-white px-4 py-2 rounded shadow transition flex items-center gap-2"
                    >
                    <FaPlus size={12}/> Novo Pedido
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Data</th>
                        <th className="py-3 px-6 text-left">Loja (Comprador)</th>
                        <th className="py-3 px-6 text-left">Fornecedor</th>
                        <th className="py-3 px-6 text-center">Total</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {orders.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-6">Nenhum pedido encontrado.</td></tr>
                        ) : orders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6 text-xs text-gray-400">...{order._id.slice(-6)}</td>
                            <td className="py-3 px-6">{formatDate(order.createdAt)}</td>
                            <td className="py-3 px-6 font-medium">
                                {order.store_id?.store_name || <span className="text-red-400">Loja Excluída</span>}
                            </td>
                            <td className="py-3 px-6">
                                {order.supplier_id?.supplier_name || <span className="text-red-400">--</span>}
                            </td>
                            <td className="py-3 px-6 text-center font-bold text-gray-800">
                                {formatCurrency(order.total_amount)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {getStatusBadge(order.status)}
                            </td>
                            <td className="py-3 px-6 text-center flex justify-center gap-3">
                                <div className="flex items-center justify-center gap-4">
                                    <button 
                                        onClick={() => handleEdit(order._id)} 
                                        className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110 p-1"
                                        title="Editar"> <FaEye size={18} /> </button>

                                    <button 
                                        onClick={() => handleDelete(order._id)} 
                                        className="text-red-500 hover:text-red-700 transition transform hover:scale-110 p-1"
                                        title="Excluir"> <FaTrash size={18} /> </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}