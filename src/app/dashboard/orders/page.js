'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';

export default function OrdersList() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const getStatusBadge = (status) => {
        const styles = {
            PENDENTE: 'bg-yellow-100 text-yellow-800',
            SEPARADO: 'bg-blue-100 text-blue-800',
            ENVIADO: 'bg-green-100 text-green-800',
            CANCELADO: 'bg-red-100 text-red-800'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

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
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6 font-bold">#{order.id}</td>
                            <td className="py-3 px-6">{formatDate(order.dt_inc)}</td>
                            <td className="py-3 px-6">{order.loja_nome}</td>
                            <td className="py-3 px-6">{order.fornecedor_nome}</td>
                            <td className="py-3 px-6 text-center font-bold text-gray-800">
                                {formatCurrency(order.vl_total_pedido)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {getStatusBadge(order.status)}
                            </td>
                            <td className="py-3 px-6 text-center flex justify-center gap-3">
                            <button className="text-blue-500 hover:text-blue-700" title="Ver Detalhes"><FaEye /></button>
                            <button className="text-red-500 hover:text-red-700" title="Cancelar"><FaTrash /></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}