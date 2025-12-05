// import typeOptions from "../../data/transactionTypes.json";

export function TransactionModal({
  isOpen,
  form,
  errors,
  onChange,
  onClose,
  onSubmit,
  isEditing,
  typeOptions,
  categories,
  dataBank
}) {
  if (!isOpen) return null;

  function selectCategoriesTypes(form){
    const selectCategories = categories.find(cat => (cat.titulo === form.type));
    return selectCategories ? selectCategories.items : []
  }

  const selectCategories = selectCategoriesTypes(form);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar transacción" : "Nueva transacción"}
        </h2>

        <form onSubmit={onSubmit} className="grid gap-4">
          {/* Tipo */}
          <select
            name="type"
            value={form.type}
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={onChange}
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Categoría / Motivo */}
          <select
          name="category"
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          onChange={onChange}
          value={form.category}
          >
            {selectCategories.map(cat => (
              <option key={cat.id} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Banks */}
          <select
          name="bank"
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          onChange={onChange}
          value={form.bank}
          >
            {dataBank.map(bank => (
              <option key={bank.id} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </select>


          {/* Monto */}
          <div>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={onChange}
              placeholder="Monto"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.amount && (
              <p className="text-red-400 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Fecha */}
          <div>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Nota */}
          <textarea
            name="note"
            rows="2"
            value={form.note}
            onChange={onChange}
            placeholder="Nota (opcional)"
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 resize-none"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
