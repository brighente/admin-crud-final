'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function CreateOrder() {
  const router = useRouter();
  
  const [lojas, setLojas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]); 
  const [allProducts, setAllProducts] = useState([]); 

  const [selectedLoja, setSelectedLoja] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  
  const [itens, setItens] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id_produto: '', quantidade: 1 });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [resLojas, resForn, resProd] = await Promise.all([
                fetch('/api/stores'),
                fetch('/api/suppliers'),
                fetch('/api/products')
            ]);

            const dataLojas = await resLojas.json();
            const dataForn = await resForn.json();
            const dataProd = await resProd.json();

            setLojas(Array.isArray(dataLojas) ? dataLojas : []);
            setFornecedores(Array.isArray(dataForn) ? dataForn : []);
            setAllProducts(Array.isArray(dataProd) ? dataProd : []);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(!selectedFornecedor) {
        setProdutos([]);
        return;
    }
    
    const filtrados = allProducts.filter(p => {
        const pFornId = p.supplier_id?._id || p.supplier_id;
        return pFornId === selectedFornecedor;
    });

    setProdutos(filtrados);
    setItens([]); 
  }, [selectedFornecedor, allProducts]);

  const handleAddItem = () => {
    if(!currentItem.id_produto || currentItem.quantidade <= 0) return alert("Selecione um produto e quantidade válida");

    const produtoInfo = produtos.find(p => p._id === currentItem.id_produto);
    
    if (!produtoInfo) return;

    const novoItem = {
        id_produto: currentItem.id_produto,
        nome: produtoInfo.name, 
        valor_unitario: parseFloat(produtoInfo.price),
        quantidade: parseInt(currentItem.quantidade),
        total: parseFloat(produtoInfo.price) * parseInt(currentItem.quantidade)
    };

    setItens([...itens, novoItem]);
    setCurrentItem({ id_produto: '', quantidade: 1 });
  };

  const handleRemoveItem = (index) => {
    const novaLista = [...itens];
    novaLista.splice(index, 1);
    setItens(novaLista);
  };

  const totalGeral = itens.reduce((acc, item) => acc + item.total, 0);

  const handleSubmit = async () => {
    if(!selectedLoja || !selectedFornecedor || itens.length === 0) {
        return alert("Preencha todos os dados e adicione itens.");
    }

    setLoading(true);
    try {
        const payload = {
            id_loja: selectedLoja,
            id_fornecedor: selectedFornecedor,
            itens: itens
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if(res.ok){
            alert("Pedido Realizado com Sucesso!");
            router.push('/dashboard/orders');
        } else {
            const data = await res.json();
            alert("Erro: " + (data.message || 'Erro desconhecido'));
        }
    } catch(err){
        alert("Erro de conexão.");
    } finally {
        setLoading(false);
    }
  };

    return (
        <div className="container mx-auto pb-10">
            <h1 className="text-2xl font-bold text-black mb-6">Novo Pedido</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-1 space-y-6">
                    
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-1">Dados do Pedido</h3>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1">Fornecedor (Vendedor)</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none"
                                value={selectedFornecedor}
                                onChange={e => setSelectedFornecedor(e.target.value)}
                                required
                            >
                                <option value="">Selecione...</option>
                                {fornecedores.map(f => (
                                    <option key={f._id} value={f._id}>{f.supplier_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1">Loja (Comprador)</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none"
                                value={selectedLoja}
                                onChange={e => setSelectedLoja(e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {lojas.map(l => (
                                    <option key={l._id} value={l._id}>{l.store_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`bg-white p-6 rounded shadow-sm border border-gray-200 ${!selectedFornecedor ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-1">Adicionar Itens</h3>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1">Produto</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:border-green-500 outline-none"
                                value={currentItem.id_produto}
                                onChange={e => setCurrentItem({...currentItem, id_produto: e.target.value})}
                            >
                                <option value="">Selecione o produto...</option>
                                {produtos.map(p => (
                                    <option key={p._id} value={p._id}>{p.name} - R$ {p.price}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1">Quantidade</label>
                            <input 
                                type="number" 
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-green-500 outline-none"
                                value={currentItem.quantidade}
                                onChange={e => setCurrentItem({...currentItem, quantidade: e.target.value})}
                            />
                        </div>

                        <button 
                            onClick={handleAddItem}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 font-medium transition"
                        >
                            <FaPlus size={12}/> Adicionar ao Carrinho
                        </button>
                    </div>

                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 min-h-[400px] flex flex-col">
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-1 flex justify-between items-center">
                            <span>Itens do Pedido</span>
                            <span className="text-black bg-gray-100 px-2 py-1 rounded text-xs">{itens.length} itens</span>
                        </h3>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="py-2 px-4">Produto</th>
                                        <th className="py-2 px-4 text-center">Qtd</th>
                                        <th className="py-2 px-4 text-right">Unitário</th>
                                        <th className="py-2 px-4 text-right">Total</th>
                                        <th className="py-2 px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itens.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-10 text-gray-400 italic">
                                                <FaShoppingCart className="mx-auto mb-2 text-3xl text-gray-300"/>
                                                Nenhum item adicionado ainda.
                                            </td>
                                        </tr>
                                    ) : (
                                        itens.map((item, idx) => (
                                            <tr key={idx} className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-4 font-medium">{item.nome}</td>
                                                <td className="py-2 px-4 text-center">{item.quantidade}</td>
                                                <td className="py-2 px-4 text-right">R$ {item.valor_unitario.toFixed(2)}</td>
                                                <td className="py-2 px-4 text-right font-bold">R$ {item.total.toFixed(2)}</td>
                                                <td className="py-2 px-4 text-center">
                                                    <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700">
                                                        <FaTrash size={12}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 border-t pt-4 flex flex-col items-end">
                            <div className="text-xl text-gray-800">
                                Total do Pedido: <span className="font-bold text-[#009933]">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGeral)}
                                </span>
                            </div>
                            <button 
                                onClick={handleSubmit}
                                disabled={loading || itens.length === 0}
                                className={`mt-4 px-8 py-3 rounded text-white font-bold transition flex items-center gap-2 ${
                                    itens.length === 0 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#009933] hover:bg-[#007a29] shadow-lg'
                                }`}> {loading ? 'Processando...' : 'FINALIZAR PEDIDO'} </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}