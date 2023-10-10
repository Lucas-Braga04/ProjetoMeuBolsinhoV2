import React, { useState, useEffect } from 'react';
// Função para formatar a data no formato "aaaa/mm/dd"
function formatarData(data: Date | string): string {
    let dataObj: Date;

    if (typeof data === 'string') {
        dataObj = new Date(data);

        if (isNaN(dataObj.getTime())) {
            throw new Error('Data inválida');
        }
    } else if (data instanceof Date) {
        dataObj = data;
    } else {
        throw new Error('Tipo de entrada inválido');
    }

    // Obtenha o offset do fuso horário local em minutos
    const offsetMinutes = dataObj.getTimezoneOffset();

    // Adicione o offset do fuso horário local à data antes de formatá-la
    dataObj.setMinutes(dataObj.getMinutes() + offsetMinutes);

    const ano = dataObj.getFullYear();
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataObj.getDate().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano}`;
}
// Crie tipos para representar os dados das despesas
type Despesa = {
    editando: boolean;
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

    const handleCheckboxChange = (index: number) => {
        // Copie o array de despesas e atualize o valor do campo "editando" para o índice especificado
        const newData = categoriaData.map((despesa, i) => {
            if (i === index) {
                return { ...despesa, editando: !despesa.editando };
            }
            return despesa;
        });
        setCategoriaData(newData);
    };

    const handleSaveChanges = (index: number) => {
        // Atualize os dados no localStorage com as alterações feitas
        const existingData = JSON.parse(localStorage.getItem('despesas') || '[]') as Categoria[];
        const categoriaIndex = existingData.findIndex((item) => item.tipo === selectedCategoria);

        if (categoriaIndex !== -1) {
            existingData[categoriaIndex].despesas[index] = categoriaData[index];
            localStorage.setItem('despesas', JSON.stringify(existingData));
        }

        // Após salvar, desmarque o modo de edição
        handleCheckboxChange(index);
    };

    return (
        <div className="mt-4 flex flex-col bg-gray-950 rounded-lg p-4 shadow-sm sm:w-2/3 w-full">
            <div>
                <h2 className="text-white font-bold text-lg">Relatório Detalhado</h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                    <div className="flex-1 mt-4">
                        <label className="text-white" htmlFor="categoria">
                            Categoria
                        </label>
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
                                <form key={index} onSubmit={(e) => e.preventDefault()}>
                                    <li className="flex bg-gray-600 rounded-md border-gray-700 text-white px-2 py-2 m-2 sm:justify-between">
                                        <div className="flex justify-between items-center w-full">
                                            <label className="flex justify-center items-center">
                                                <input
                                                    className="flex justify-center items-center"
                                                    type="checkbox"
                                                    name="editando"
                                                    checked={despesa.editando || false}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                                {despesa.editando ? 'Modificado' : 'Editar'}
                                            </label>
                                            {despesa.editando ? (
                                                <>
                                                    <input
                                                        value={despesa.descricao}
                                                        className="w-full sm:w-1/3 bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                                                        type="text"
                                                        id="descricao"
                                                        name="descricao"
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            setCategoriaData((prevState) =>
                                                                prevState.map((item, idx) =>
                                                                    idx === index ? { ...item, descricao: newValue } : item
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <input
                                                        value={"Valor: "+ despesa.valor}
                                                        className="w-full sm:w-1/3 bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                                                        type="text"
                                                        id="valor"
                                                        name="valor"
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            setCategoriaData((prevState) =>
                                                                prevState.map((item, idx) =>
                                                                    idx === index ? { ...item, valor: newValue } : item
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <input
                                                        value={despesa.data}
                                                        className="min-w-110 sm:w-1/5 bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                                                        type="date"
                                                        id="data"
                                                        name="data"
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            setCategoriaData((prevState) =>
                                                                prevState.map((item, idx) =>
                                                                    idx === index ? { ...item, data: newValue } : item
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <button
                                                        className="bg-white text-black font-semibold rounded-md px-4 py-1 hover:bg-blue-900 hover:text-white transition-all duration-200 mt-2 sm:mt-0"
                                                        type="button"
                                                        onClick={() => handleSaveChanges(index)}
                                                    >
                                                        Salvar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                        <div className="flex items-center w-10/12">
                                                            <div className="flex-1">
                                                                <span className="text-white">
                                                                    <strong>Descrição:</strong> {despesa.descricao}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <span className="text-white">
                                                                    <strong>Valor:</strong> R$ {parseFloat(despesa.valor).toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <span className="text-white">
                                                                    <strong>Data:</strong> {formatarData(despesa.data)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                </form>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatorioDetalhadoForm;
