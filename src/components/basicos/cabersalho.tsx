import React, { useState } from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


function cabersalho() {
    const [hovered, setHovered] = useState(false);

    const buttonText = hovered ? 'Saudades Java :(' : 'Projeto meu bolsinho';

    return (
        <button
            className="uppercase cursor-default mt-5 rounded-2xl bg-gray-950 text-white w-2/4 font-bold px-4 py-2 hover:shadow-[0.5rem_0.5rem_#C51605,-0.5rem_-0.5rem_#3085C3] hover:text-red-700 transition "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {buttonText}
        </button>
    );

}

export default cabersalho;