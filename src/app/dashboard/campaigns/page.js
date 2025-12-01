'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Se der erro de ícone: npm install react-icons
import { FaPlus, FaTrash, FaPen, FaBullhorn } from 'react-icons/fa';

export default function CampaignsList() {
    const [campaigns, setCampaigns] = useState([]);
    const router = useRouter();

    const fetchCampaigns = () => {
        fetch('/api/campaign') // Atenção: o nome do arquivo que criamos foi 'campaign', não 'campaigns'
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)) setCampaigns(data);
                else setCampaigns([]);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchCampaigns(); }, []);

    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const handleDelete = async (id) => {
        if(!confirm("Deseja excluir esta campanha?")) return;
        
        // CORREÇÃO: URL dinâmica /id
        // ATENÇÃO: Verifique se sua pasta api se chama 'campaign' ou 'campaigns'.
        // Baseado nos passos anteriores, criamos 'src/app/api/campaign/route.js' (singular).
        // Se a pasta do ID for 'src/app/api/campaign/[id]', a url é esta:
        const res = await fetch(`/api/campaign/${id}`, { method: 'DELETE' });
        
        if(res.ok) fetchCampaigns();
        else alert("Erro ao excluir");
    };

    const handleEdit = (id) => {
        router.push(`/dashboard/campaigns/${id}`);
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Campanhas Promocionais</h1>
                <Link 
                href="/dashboard/campaigns/create" 
                className="bg-[#009933] hover:bg-[#007a29] text-white px-4 py-2 rounded shadow transition flex items-center gap-2"
                >
                <FaPlus size={12}/> Nova Campanha
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-6 text-left">Descrição</th>
                        <th className="py-3 px-6 text-left">Fornecedor</th>
                        <th className="py-3 px-6 text-center">Meta (R$)</th>
                        <th className="py-3 px-6 text-center">Duração</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {campaigns.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-6">Nenhuma campanha ativa.</td></tr>
                        ) : campaigns.map((camp) => (
                        <tr key={camp._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6 font-medium flex items-center gap-2 text-gray-700">
                                <FaBullhorn className="text-orange-500"/>
                                {/* CORREÇÃO: Campos em inglês */}
                                {camp.name}
                            </td>
                            <td className="py-3 px-6">
                                {camp.supplier_id?.supplier_name || <span className="text-red-400">--</span>}
                            </td>
                            <td className="py-3 px-6 text-center font-bold text-green-700">
                                {formatCurrency(camp.sales_goal)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {camp.duration_days} dias
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {camp.status === 'Active' ? 'Em Andamento' : 'Encerrada'}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center flex justify-center gap-3">
                                <button onClick={() => handleEdit(camp._id)} className="text-blue-500 hover:text-blue-700 transition">
                                    <FaPen />
                                </button>
                                <button onClick={() => handleDelete(camp._id)} className="text-red-500 hover:text-red-700 transition">
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