'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditOrder() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setStatus(data.status);
            });
    }, [id]);

    const handleUpdateStatus = async () => {
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }) 
        });

        if(res.ok) {
            alert('Status atualizado!');
            router.push('/dashboard/orders');
        } else {
            alert('Erro ao atualizar');
        }
    }

    if (!order) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Detalhes do Pedido #{order._id.slice(-6)}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded shadow p-6">
                    <h3 className="font-bold text-lg mb-4">Itens do Pedido</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100"><th className="p-2 text-left">Produto</th><th className="p-2">Qtd</th><th className="p-2 text-right">Total</th></tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="p-2">{item.product_id?.name || 'Item excluído'}</td>
                                    <td className="p-2 text-center">{item.quantity}</td>
                                    <td className="p-2 text-right">R$ {(item.unit_price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right text-xl font-bold text-green-700">
                        Total: R$ {order.total_amount.toFixed(2)}
                    </div>
                </div>

                <div className="bg-white rounded shadow p-6 h-fit">
                    <h3 className="font-bold text-lg mb-4">Gerenciar Pedido</h3>
                    
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm">Loja:</p>
                        <p className="font-bold">{order.store_id?.store_name}</p>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm mb-1">Status Atual</label>
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            className="w-full border p-2 rounded bg-white"
                            required
                        >
                            <option value="Pending">Pendente</option>
                            <option value="Confirmed">Confirmado</option>
                            <option value="Shipped">Enviado</option>
                            <option value="Delivered">Entregue</option>
                            <option value="Cancelled">Cancelado</option>
                        </select>
                    </div>

                    <button onClick={handleUpdateStatus} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Atualizar Status
                    </button>
                </div>
            </div>
        </div>
    );
}