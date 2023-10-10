import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Menu() {
    return (
        <nav className={`flex flex-col items-center justify-between p-16 ${inter.className}`}>
            <ul className="flex gap-4">
                <li>
                    <button className="bg-gray-950 text-gray-100 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-2xl hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                        <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-2xl opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        <Link href="cadastro">Cadastro Despesa</Link>
                    </button>
                </li>
                <li>
                    <button className="bg-gray-950 text-gray-100 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-2xl hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                        <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-2xl opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        <Link href="relatorioUnitario">Relatório Unificado</Link>
                    </button>
                </li>
                <li>
                    <button className="bg-gray-950 text-gray-100 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-2xl hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                        <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-2xl opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        <Link href="relatorioDetalhado">Relatório Detalhado</Link>
                    </button>
                </li>
            </ul>
        </nav>

    );
}

export default Menu;