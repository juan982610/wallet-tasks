import { useEffect, useMemo, useState } from "react";
import typeOptions from "../data/transactionTypes.json";
import categoryType from "../data/categoryType.json";
import initialTransactions from "../data/transactions.json";
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from "../services/transactionsService";
import { formatCOP } from "../utils/formatMoney";
import { formatDateISOToHuman } from "../utils/formatDate";

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
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">{formatCOP(totalIngresos)}</p>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Gastos</p>
          <p className="text-2xl font-bold text-red-600">{formatCOP(totalGastos)}</p>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
          <p className="text-2xl font-bold">{formatCOP(balance)}</p>
        </div>
      </div>

      {/* Tabla / Lista */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
            <tr>
              <th className="text-left p-3">Tipo</th>
              <th className="text-left p-3">Categoría</th>
              <th className="text-left p-3">Monto</th>
              <th className="text-left p-3">Fecha</th>
              <th className="text-left p-3">Nota</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              // 🟡 Caso: no hay transacciones
              <tr>
                <td
                  colSpan={6} // pon 6 si tu tabla tiene 6 columnas (ej: Acciones)
                  className="text-center text-gray-500 dark:text-gray-400 p-6"
                >
                  No hay transacciones registradas aún.
                </td>
              </tr>
            ) : (
              // 🟢 Caso: sí hay transacciones
              transactions.map(transacion => (
                <tr
                  key={transacion.id}
                  className="border-t border-slate-700/60 hover:bg-slate-800/60 transition-colors"
                >
                  {/* Tipo */}
                  <td className="p-3">
                    <span
                      className={
                        transacion.type === "ingreso"
                          ? "inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30"
                          : "inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30"
                      }
                    >
                      {transacion.type === "ingreso" ? "Ingreso" : "Gasto"}
                    </span>
                  </td>

                  {/* Categoría */}
                  <td className="p-3 text-slate-100">
                    {transacion.category}
                  </td>

                  {/* Monto */}
                  <td className="p-3 font-semibold text-slate-100">
                    {formatCOP(transacion.amount)}
                  </td>

                  {/* Fecha */}
                  <td className="p-3 text-slate-400 text-sm">
                    {formatDateISOToHuman(transacion.date)}
                  </td>

                  {/* Nota */}
                  <td className="p-3 text-slate-300 text-sm">
                    {transacion.note || "—"}
                  </td>
                  {/* Acciones */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {/* Editar */}
                      <button
                        type="button"
                        onClick={() => handleOpenCreate(transacion)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors"
                        >
                        Editar
                      </button>

                      {/* Eliminar */}
                      <button
                        type="button"
                        onClick={() => handleDelete(transacion.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
