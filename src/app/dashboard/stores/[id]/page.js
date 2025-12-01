'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditStore() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        cnpj: '', nome_fantasia: '', razao_social: '', email: '', telefone: '',
        logradouro: '', numero: '', bairro: '', cidade: '', estado: '', cep: ''
    });

    useEffect(() => {
        fetch(`/api/stores/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    nome_fantasia: data.store_name,
                    razao_social: data.corporate_reason,
                    cnpj: data.cnpj,
                    email: data.contact_email,
                    telefone: data.phone_number,
                    // Desconstruindo o endereço
                    logradouro: data.address?.street || '',
                    numero: data.address?.number || '',
                    bairro: data.address?.district || '',
                    cidade: data.address?.city || '',
                    estado: data.address?.state || '',
                    cep: data.address?.zip_code || ''
                });
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/stores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            alert('Loja atualizada!');
            router.push('/dashboard/stores');
        } else {
            alert('Erro ao atualizar.');
        }
    };

    const estados = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];

    if (loading) return <div>Carregando...</div>;

    // (Reutilize o JSX do formulário do CreateStore aqui, substituindo apenas o <h1 e o botão)
    // Para economizar espaço, vou colocar o essencial, copie o visual do create se quiser igual
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-black mb-6">Editar Loja</h1>
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                <form onSubmit={handleSubmit}>
                    {/* Campos Principais */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <input name="nome_fantasia" value={form.nome_fantasia} onChange={handleChange} placeholder="Nome Fantasia" className="border p-2 rounded" />
                        <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" className="border p-2 rounded" />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
                    </div>
                    {/* Endereço (Simplificado para o exemplo, copie do create se quiser completo) */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <input name="logradouro" value={form.logradouro} onChange={handleChange} placeholder="Rua" className="border p-2 rounded" />
                        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border p-2 rounded" />
                        <select name="estado" value={form.estado} onChange={handleChange} className="border p-2 rounded bg-white">
                             {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}