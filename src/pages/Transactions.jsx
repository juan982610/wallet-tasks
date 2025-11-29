import { useEffect, useMemo, useState } from "react";
import typeOptions from "../data/transactionTypes.json";
import { FilterChips } from "../components/transactions/FilterChips";
import { StatsCard } from "../components/transactions/StatsCard";
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from "../services/transactionsService";
import { formatCOP } from "../utils/formatMoney";
import { formatDateISOToHuman } from "../utils/formatDate";
import { TransactionsTable } from "../components/transactions/TransactionsTable";


const initialForm = {
    type: "gasto",
    category: "",
    amount: "",
    date: "",
    note: ""
  }

export default function Transactions() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [errors, setErrors] = useState({});

  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === "all") return true;
    return tx.type === filterType;
  });

  const totalIngresos = transactions
  .filter(tx => tx.type === "ingreso")
  .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalGastos = transactions
  .filter(tx => tx.type === "gasto")
  .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const balance = totalIngresos - totalGastos;

  function handleCloseForm(){
    setShowForm(false)
  }

  function validateForm(){
    const newErrors = {};

    // Category
    if (!form.category.trim()) {
      newErrors.category = "La categoría o motivo es obligatoria.";
    }

    // Amount
    if (!form.amount) {
      newErrors.amount = "El monto es obligatorio.";
    } else if (isNaN(form.amount)) {
      newErrors.amount = "El monto debe ser numérico.";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "El monto debe ser mayor a 0.";
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

    if (!form.date) {
      newErrors.date = "La fecha es obligatoria.";
    } else if (!dateRegex.test(form.date)) {
      newErrors.date = "Formato de fecha inválido.";
    }

    return newErrors;

  }

  function handleOpenCreate(transacion = null){
  if (transacion) {
    // Modo edición

    setForm({
      ...transacion,
      amount: String(transacion.amount ?? ""),
    });
  } else {
    // Modo creación
    setForm(initialForm);
  }

  setErrors({});
  setShowForm(true);  
}
  
  function handleChange(e){

    const {name,value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }

  function handleSubmit(e){
    e.preventDefault();

    const validationErrors = validateForm(form);

    
    if (Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }
    
    if(form.id){
      console.log(form.id,form);
      const updatedList = updateTransaction(form.id, form); 
      setTransactions(updatedList);
    }else{
      const newTx = createTransaction(form);
      setTransactions(prev => [...prev, newTx])
    }

    setShowForm(false);
    setForm(initialForm);
    setErrors({}); 
  } 

  function handleDelete(id){
    const updatedList = deleteTransaction(id);
    setTransactions(updatedList);
  }

  return (
    <section className="space-y-6">
      {/* Header interno */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transacciones</h1>
        <button
          onClick={() => handleOpenCreate()}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          + Agregar transacción
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          label="Ingresos"
          amount={totalIngresos}
          variant="ingreso"
        />
        <StatsCard
          label="Gastos"
          amount={totalGastos}
          variant="gasto"
        />
        <StatsCard
          label="Balance"
          amount={balance}
          variant="neutral"
        />
      </div>

      <FilterChips
        value={filterType}
        onChange={setFilterType}
      />

      {/* Tabla / Lista */}
      <TransactionsTable
        transactions={filteredTransactions}
        onEdit={handleOpenCreate}
        onDelete={handleDelete}
      />


      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-2xl leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Nueva transacción</h2>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <select
                name="type"
                value={form.type}
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                onChange={handleChange}
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                  {option.label} </option>
                  ))}
              </select>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Motivo"
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
              
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Monto"
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />

              {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />

              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}


              <textarea
                name="note"
                rows="2"
                value={form.note}
                onChange={handleChange}
                placeholder="Nota (opcional)"
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
