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
    editado: boolean;
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
                return {
                    ...despesa, 
                    editando: !despesa.editando,
                 };
            }
            return despesa;
        });
        setCategoriaData(newData);

        //Atualizando o localStorage com os dados brutos
        const existingData = JSON.parse(localStorage.getItem('despesas') || '[]') as Categoria[];
        const categoriaIndex = existingData.findIndex((item) => item.tipo === selectedCategoria);

        if(categoriaIndex !== -1){
            existingData[categoriaIndex].despesas = newData;
            localStorage.setItem('despesas', JSON.stringify(existingData));
        }

    };

    const handleSaveChanges = (index: number) => {

        //Limpar a marcação de editado ao salvar as alterações feitas
        const updateCategoriaData = categoriaData.map((despesa, i) =>{
            if(i === index){
                return{
                    ...despesa,
                    editado: true,
                };
            }
            return despesa;
        })

        setCategoriaData(updateCategoriaData);


        // Atualize os dados no localStorage com as alterações feitas
        const existingData = JSON.parse(localStorage.getItem('despesas') || '[]') as Categoria[];
        const categoriaIndex = existingData.findIndex((item) => item.tipo === selectedCategoria);

        if (categoriaIndex !== -1) {
            existingData[categoriaIndex].despesas = updateCategoriaData;
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
                                    <li key={index} className={`flex ${despesa.editado ? 'bg-yellow-200' : 'bg-gray-600'} rounded-md border-gray-700 text-white px-2 py-2 m-2 sm:justify-between`}>
                                        <div className="flex justify-between items-center w-full">
                                            <label className="flex justify-center items-center">
                                                <input
                                                    className="flex justify-center items-center"
                                                    type="checkbox"
                                                    name="editando"
                                                    checked={despesa.editando || false}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                                {despesa.editando ? 'Modificando' : 'Editar'}
                                            </label>
                                            {despesa.editado && <span className="text-yellow-500 p-4">Editado</span>}
                                            {despesa.editando ? (
                                                <div className="flex flex-col lg:flex-row w-full">
                                                    <div className="w-auto lg:w-3/4 xl:w-3/5  p-2">
                                                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                                            <strong className="text-white block">Descrição:</strong>
                                                            <input
                                                                value={despesa.descricao}
                                                                className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
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
                                                        </div>
                                                    </div>
                                                    <div className="w-auto xl:w-2/5 p-2">
                                                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                                            <strong className="text-white block">Valor:</strong>
                                                            <input
                                                                value={despesa.valor}
                                                                className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
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
                                                        </div>
                                                    </div>
                                                    <div className="w-auto xl:w-2/5 p-2">
                                                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                                            <strong className="text-white block">Data:</strong>
                                                            <input
                                                                value={despesa.data}
                                                                className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
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
                                                        </div>
                                                    </div>
                                                    <div className="w-auto p-2">
                                                        <button
                                                            className="bg-white text-black font-semibold rounded-md px-4 py-2 hover:bg-blue-900 hover:text-white transition-all duration-200 w-full"
                                                            type="button"
                                                            onClick={() => handleSaveChanges(index)}
                                                        >
                                                            Salvar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center w-10/12">
                                                        <div className="flex-auto">
                                                            <span className="text-white">
                                                                <strong>Descrição:</strong> {despesa.descricao}
                                                            </span>
                                                        </div>
                                                        <div className="flex-auto">
                                                            <span className="text-white">
                                                                <strong>Valor:</strong> R$ {parseFloat(despesa.valor).toFixed(2)}
                                                            </span>
                                                        </div>
                                                        <div className="flex-nowrap">
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
