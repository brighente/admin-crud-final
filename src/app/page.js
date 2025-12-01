'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await res.json();

            if(res.ok){
                localStorage.setItem('adminToken', data.token);
                router.push('/dashboard');
            } else {
                setError(data.message || 'Erro ao entrar');
            }
        } catch(err) {
            setError('Erro de conexão');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800"> Admin Login </h1>
            
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input 
                    type="text" 
                    placeholder="admin@central.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                    />
                    <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                    />
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"> ENTRAR </button>
                </form>
            </div>
        </div>
  );
}