import { useEffect, useMemo, useState } from "react";
import typeOptions from "../data/transactionTypes.json";
import categoryType from "../data/categoryType.json";
import { createTransaction, deleteTransaction, getTransactions } from "../services/transactionsService";
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


  function handleChange(e){

    const {name,value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }



  return (
    <section className="space-y-6">
      {/* Header interno */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transacciones</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          + Agregar transacción
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">$0</p>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Gastos</p>
          <p className="text-2xl font-bold text-red-600">$0</p>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
          <p className="text-2xl font-bold">$0</p>
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
            {/* 🧩 Aquí irán las filas dinámicas */}
            <tr>
              <td colSpan="6" className="text-center text-gray-500 dark:text-gray-400 p-6">
                No hay transacciones registradas aún.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-2xl leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Nueva transacción</h2>

            <form className="grid gap-4">
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

              <select
                name="type"
                value={form.type}
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                onChange={handleChange}
              >
                {categoryType.map(option => (
                  <option key={option.value} value={option.value}>
                  {option.label} </option>
                  ))}
              </select>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Monto"
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />

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
                  onClick={() => setShowForm(false)}
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
