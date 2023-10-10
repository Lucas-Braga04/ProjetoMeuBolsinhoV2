import React, { useState, useEffect } from 'react';

function RelatorioUnificadoForm() {
    const [selectedCategoria, setSelectedCategoria] = useState('1'); // Categoria selecionada
    const [totalValor, setTotalValor] = useState(0); // Valor total da categoria

    useEffect(() => {
        // Função para calcular o valor total da categoria selecionada
        const calcularTotalValor = () => {
            // Obtenha os dados existentes do localStorage ou inicialize-os
            const existingData = JSON.parse(localStorage.getItem('despesas') || '[]');

            // Encontre a categoria correspondente no array de dados existentes
            const categoria = existingData.find((item: { tipo: string; }) => item.tipo === selectedCategoria);

            if (categoria) {
                // Calcule a soma dos valores das despesas da categoria
                const total = categoria.despesas.reduce((acc: number, despesa: { valor: string; }) => acc + parseFloat(despesa.valor), 0);
                setTotalValor(total);
            } else {
                // Se a categoria não existir, defina o valor total como zero
                setTotalValor(0);
            }
        };

        calcularTotalValor();
    }, [selectedCategoria]);

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoria(e.target.value);
    };

    return (
        <div className="mt-4 flex flex-col bg-gray-950 rounded-lg p-4 shadow-sm sm:w-2/3 w-2/4">
            <div>
                <h2 className="text-white font-bold text-lg">Relatório Unificado</h2>
                <div className="flex flex-row space-x-2">
                    <div className="flex-1 mt-4">
                        <label className="text-white" htmlFor="categoria">Categoria</label>
                        <select
                            className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                            id="categoria"
                            name="categoria"
                            onChange={handleCategoriaChange}
                            value={selectedCategoria}
                            required
                        >
                            <option value="1">Lanches</option>
                            <option value="2">Livros</option>
                            <option value="3">Transporte</option>
                            <option value="4">Material didático</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label className="text-white" htmlFor="name">Valor</label>
                        <input
                            value={`Total: R$ ${totalValor.toFixed(2)}`} // Exibe o valor total formatado
                            className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                            type="text"
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatorioUnificadoForm;
