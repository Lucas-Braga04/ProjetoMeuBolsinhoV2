import React, { useState, useEffect } from 'react';

// Crie tipos para representar os dados das despesas
type Despesa = {
    descricao: string;
    valor: string;
    data: string;
};

type Categoria = {
    tipo: string;
    despesas: Despesa[];
};

function RelatorioDetalhadoForm() {
    const [selectedCategoria, setSelectedCategoria] = useState('1'); // Categoria selecionada
    const [categoriaData, setCategoriaData] = useState<Despesa[]>([]); // Dados da categoria selecionada

    useEffect(() => {
        // Função para obter os dados da categoria selecionada
        const obterDadosCategoria = () => {
            // Obtenha os dados existentes do localStorage ou inicialize-os
            const existingData = JSON.parse(localStorage.getItem('despesas') || '[]') as Categoria[];

            // Encontre a categoria correspondente no array de dados existentes
            const categoria = existingData.find((item) => item.tipo === selectedCategoria);

            if (categoria) {
                setCategoriaData(categoria.despesas);
            } else {
                // Se a categoria não existir, defina os dados da categoria como um array vazio
                setCategoriaData([]);
            }
        };

        obterDadosCategoria();
    }, [selectedCategoria]);

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoria(e.target.value);
    };

    return (
        <div className="mt-4 flex flex-col bg-gray-950 rounded-lg p-4 shadow-sm sm:w-2/3 w-2/4">
            <div>
                <h2 className="text-white font-bold text-lg">Relatório Detalhado</h2>
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
                        <h3 className="text-white font-bold text-md">Despesas da Categoria</h3>
                        <ul className="text-white">
                            {categoriaData.map((despesa, index) => (
                                <li key={index}>
                                    {`Descrição: ${despesa.descricao}, Valor: R$ ${parseFloat(despesa.valor).toFixed(2)}, Data: ${despesa.data}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatorioDetalhadoForm;
