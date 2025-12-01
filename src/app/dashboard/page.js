import Link from 'next/link';

const MenuButton = ({ label, href }) => (
    <Link 
        href={href} 
        className="bg-[#009933] hover:bg-[#007a29] text-white font-bold py-6 px-4 rounded shadow-sm text-center uppercase transition-all flex items-center justify-center h-24"> {label} </Link>
);

export default function DashboardHome() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
            <div>
                <h2 className="text-2xl font-bold mb-4 uppercase text-black">Cadastro</h2>
                <div className="bg-white p-6 rounded shadow border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                        <MenuButton label="Cadastrar Fornecedor" href="/dashboard/suppliers/create" />

                        <MenuButton label="Cadastrar Usuário" href="/dashboard/users/create" />
                        
                        <MenuButton label="Cadastrar Comércio" href="/dashboard/stores/create" />

                        <MenuButton label="Cadastrar Pedido" href="/dashboard/orders/create" />
                        
                        <MenuButton label="Cadastrar Campanha" href="/dashboard/campaigns/create" />

                        <MenuButton label="Cadastrar Produto" href="/dashboard/products/create" />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 uppercase text-black">Lista</h2>
                <div className="bg-white p-6 rounded shadow border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                        <MenuButton label="Lista de Fornecedores" href="/dashboard/suppliers" />

                        <MenuButton label="Lista de Usuários" href="/dashboard/users" />
                        
                        <MenuButton label="Lista de Comércios" href="/dashboard/stores" />

                        <MenuButton label="Lista de Pedidos" href="/dashboard/orders" />
                        
                        <MenuButton label="Lista de Campanhas" href="/dashboard/campaigns" />
                        
                        <MenuButton label="Lista de Produtos" href="/dashboard/products" />
                    </div>
                </div>
            </div>

        </div>
    );
}