'use client';
import { useState } from 'react';

export default function CreateProduct() {
    const [form, setForm] = useState({ produto: '', valor: '', categoria: '', id_fornecedor: '' });

    return (
        <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Produto</h1>
        
        <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
            <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm mb-1">Nome do Produto</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" placeholder="Ex: Teclado Mecânico" />
                </div>

                <div>
                <label className="block text-gray-700 text-sm mb-1">Valor Unitário (R$)</label>
                <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" placeholder="0.00" />
                </div>

                <div>
                <label className="block text-gray-700 text-sm mb-1">Categoria</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none">
                    <option>Selecione</option>
                    <option>Eletrônicos</option>
                    <option>Móveis</option>
                    <option>Alimentos</option>
                </select>
                </div>

                <div>
                <label className="block text-gray-700 text-sm mb-1">Fornecedor Responsável</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none">
                    <option>Selecione o Fornecedor</option>
                    {/* Aqui você faria um map dos fornecedores vindos da API */}
                    <option value="1">TechSul Distribuidora</option>
                </select>
                </div>

                <div>
                <label className="block text-gray-700 text-sm mb-1">Foto (URL)</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" placeholder="http://..." />
                </div>

            </div>

            <button className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium">
                Salvar
            </button>
            </form>
        </div>
        </div>
    );
}