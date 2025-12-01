'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaTrash, FaBullhorn } from 'react-icons/fa';

export default function CampaignsList() {
    const [campaigns, setCampaigns] = useState([]);

    const fetchCampaigns = () => {
        fetch('/api/campaigns').then(res => res.json()).then(data => setCampaigns(data)).catch(err => console.error(err));
    };

    useEffect(() => { fetchCampaigns(); }, []);

    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

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
                        <tr key={camp.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6 font-medium flex items-center gap-2">
                                <FaBullhorn className="text-orange-500"/>
                                {camp.descricao_campanha}
                            </td>
                            <td className="py-3 px-6">{camp.nome_fornecedor}</td>
                            <td className="py-3 px-6 text-center font-bold">
                                {formatCurrency(camp.valor_meta)}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {camp.tempo_duracao_campanha} dias
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">
                                    Em Andamento
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                            <button className="text-red-500 hover:text-red-700 transition"><FaTrash /></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}