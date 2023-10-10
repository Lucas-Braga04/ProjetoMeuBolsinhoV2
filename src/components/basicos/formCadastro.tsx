import React, { useState } from 'react';

function FormCadastro() {
    const [formData, setFormData] = useState({
        categoria: '',
        descricao: '',
        valor: '',
        data: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verifique se todos os campos estão preenchidos
        if (!formData.categoria || !formData.descricao || !formData.valor || !formData.data) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Obtenha os dados existentes do localStorage ou inicialize-os
        const existingData = JSON.parse(localStorage.getItem('despesas') || '[]');

        // Crie um novo objeto de despesa com os dados do formulário
        const newExpense = {
            tipo: formData.categoria,
            descricao: formData.descricao,
            valor: formData.valor,
            data: formData.data,
        };

        // Encontre ou crie a categoria correspondente no array de dados existentes
        const existingCategory = existingData.find((item: any) => item.tipo === formData.categoria);
        if (existingCategory) {
            existingCategory.despesas.push(newExpense);
        } else {
            const newCategory = {
                tipo: formData.categoria,
                despesas: [newExpense],
            };
            existingData.push(newCategory);
        }

        // Atualize os dados no localStorage
        localStorage.setItem('despesas', JSON.stringify(existingData));

        // Limpe o formulário
        setFormData({
            categoria: '',
            descricao: '',
            valor: '',
            data: '',
        });

        alert('Despesa cadastrada com sucesso!');
    };

    return (
        <div className="mt-4 flex flex-col bg-gray-950 rounded-lg p-4 shadow-sm sm:w-2/3 w-2/4">
            <form onSubmit={handleSubmit}>
                <h2 className="text-white font-bold text-lg">Cadastre suas despesas</h2>
                <div className="flex flex-row space-x-2">
                    <div className="flex-1 mt-4">
                        <label className="text-white" htmlFor="categoria">Categoria</label>
                        <select
                            className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                            id="categoria"
                            name="categoria"
                            onChange={handleChange}
                            value={formData.categoria}
                            required
                        >
                            <option value=""></option>
                            <option value="1">Lanches</option>
                            <option value="2">Livros</option>
                            <option value="3">Transporte</option>
                            <option value="4">Material didático</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="descricao">Descrição</label>
                    <textarea
                        placeholder="Herdeiro do Império - Trilogia Thrawn..."
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        id="descricao"
                        name="descricao"
                        onChange={handleChange}
                        value={formData.descricao}
                    ></textarea>
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="valor">Valor</label>
                    <input
                        placeholder="79.98"
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        type="text"
                        id="valor"
                        name="valor"
                        onChange={handleChange}
                        value={formData.valor}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="data">Data</label>
                    <input
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        type="date"
                        id="data"
                        name="data"
                        onChange={handleChange}
                        value={formData.data}
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-white text-black font-semibold rounded-md px-4 py-1 hover:bg-blue-900 hover:text-white transition-all duration-200"
                        type="submit"
                    >
                        Cadastrar Despesa
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormCadastro;
