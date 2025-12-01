'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserPlus, FaList, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState('');

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? '' : menuName);
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/');
    }

    return (
        <aside className="w-64 bg-[#009933] text-white flex flex-col min-h-screen">
            <div className="p-6 flex justify-center items-center">
               <Link href="/dashboard" className="block p-2  text-xl font-bold hover:bg-[#006622] border-b border-[#009933]">Menu Principal</Link>
            </div>

            <nav className="flex-1 flex flex-col gap-2 px-2 text-sm font-medium">
                
                <div>
                    <button 
                        onClick={() => toggleMenu('cadastrar')}
                        className="w-full flex items-center justify-between p-3 rounded hover:bg-[#007a29] transition-colors">
                        <div className="flex items-center gap-3">
                            <FaUserPlus />
                            <span>Cadastrar</span>
                        </div>
                        {openMenu === 'cadastrar' ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                    </button>

                    {openMenu === 'cadastrar' && (
                        <div className="bg-[#00802b] rounded mt-1 overflow-hidden transition-all">
                            <Link href="/dashboard/users/create" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Usuário</Link>
                            <Link href="/dashboard/suppliers/create" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Fornecedor</Link>
                            <Link href="/dashboard/stores/create" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Loja</Link>
                            <Link href="/dashboard/products/create" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Produto</Link>
                            <Link href="/dashboard/campaigns/create" className="block p-2 pl-10 hover:bg-[#006622]">Campanha</Link>
                            <Link href="/dashboard/orders/create" className="block p-2 pl-10 hover:bg-[#006622]">Pedido</Link>
                        </div>
                    )}
                </div>

                <div>
                    <button 
                        onClick={() => toggleMenu('listas')}
                        className="w-full flex items-center justify-between p-3 rounded hover:bg-[#007a29] transition-colors">
                        <div className="flex items-center gap-3">
                            <FaList />
                            <span>Cadastros</span>
                        </div>
                        {openMenu === 'listas' ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                    </button>

                    {openMenu === 'listas' && (
                        <div className="bg-[#00802b] rounded mt-1 overflow-hidden transition-all">
                            <Link href="/dashboard/users" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Usuários</Link>
                            <Link href="/dashboard/suppliers" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Fornecedores</Link>
                            <Link href="/dashboard/stores" className="block p-2 pl-10 hover:bg-[#006622] border-b border-[#009933]">Lojas</Link>
                            <Link href="/dashboard/products" className="block p-2 pl-10 hover:bg-[#006622]">Produtos</Link>
                            <Link href="/dashboard/campaigns" className="block p-2 pl-10 hover:bg-[#006622]">Campanhas</Link>
                            <Link href="/dashboard/orders" className="block p-2 pl-10 hover:bg-[#006622]">Pedidos</Link>
                        </div>
                    )}
                </div>

            </nav>

            <div className="p-4 border-t border-[#007a29]">
                <button onClick={handleLogout} className="flex items-center gap-2 text-white hover:text-red-200 w-full p-2">
                    <FaSignOutAlt /> Sair
                </button>
            </div>
        </aside>
    );
}