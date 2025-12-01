'use client';
import Sidebar from '@/components/Sidebar'; // Importando o componente novo
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if(!token) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex min-h-screen bg-[#f5f5f5]">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto text-gray-800">
                {children}
            </main>
        </div>
    );
}