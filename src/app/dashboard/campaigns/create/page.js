'use client';

export default function CreateCampaign() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Cadastro de Campanha</h1>
            
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm mb-1">Descrição da Campanha</label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" placeholder="Ex: Black Friday 2025" />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Meta de Vendas (R$)</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Duração (Dias)</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Fornecedor</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none">
                                <option>Selecione</option>
                                <option>TechSul Distribuidora</option>
                            </select>
                        </div>

                    </div>

                    <button className="bg-[#009933] hover:bg-[#007a29] text-white px-6 py-2 rounded font-medium"> Salvar </button>
                </form>
            </div>
        </div>
    );
}