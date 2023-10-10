import { useState } from 'react';


export default function Expenses() {
    const [formData, setFormData] = useState({
        category: '',
        description: '',
        amount: '',
        date: '',
    });

    // Adicione uma assinatura de índice ao objeto expensesByCategory
    const [expensesByCategory, setExpensesByCategory] = useState<{ [key: string]: { description: string, amount: string, date: string }[] }>({});

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { category, description, amount, date } = formData;

        // Verificar se a categoria já existe na lista
        if (category in expensesByCategory) {
            expensesByCategory[category].push({ description, amount, date });
        } else {
            expensesByCategory[category] = [{ description, amount, date }];
        }

        // Adicionar uma categoria "Todos" para exibir todos os itens
        if ('Todos' in expensesByCategory) {
            expensesByCategory['Todos'].push({ description, amount, date });
        } else {
            expensesByCategory['Todos'] = [{ description, amount, date }];
        }

        setExpensesByCategory({ ...expensesByCategory });
        setFormData({
            category: '',
            description: '',
            amount: '',
            date: '',
        });
    };

    return (
        <div className="mt-4 flex flex-col bg-gray-950 rounded-lg p-4 shadow-sm w-2/5">
            <form onSubmit={handleSubmit}>
                <h2 className="text-white font-bold text-lg">Cadastre suas despesas</h2>
                <div className="flex flex-row space-x-2">
                    <div className="flex-1 mt-4">
                        <label className="text-white" htmlFor="category">
                            Categoria
                        </label>
                        <select
                            className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                            id="category"
                            onChange={handleChange}
                            value={formData.category}
                            required
                        >
                            <option value=""></option>
                            <option value="Lanches">Lanches</option>
                            <option value="Livros">Livros</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Material didatico">Material didático</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="description">
                        Descrição
                    </label>
                    <textarea
                        placeholder="Herdeiro do Império - Trilogia Thrawn..."
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        id="description"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    ></textarea>
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="amount">
                        Valor
                    </label>
                    <input
                        placeholder="79.98"
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        type="text"
                        id="amount"
                        onChange={handleChange}
                        value={formData.amount}
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="text-white" htmlFor="date">
                        Data
                    </label>
                    <input
                        className="w-full bg-gray-600 rounded-md border-gray-700 text-white px-2 py-1"
                        type="date"
                        id="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                        required
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
