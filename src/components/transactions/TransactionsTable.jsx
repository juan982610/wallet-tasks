import { TransactionRow } from "./TransactionRow";

export function TransactionsTable({ transactions, onEdit, onDelete, sortOrder, onSort }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
          <tr>
            <th className="text-left p-3">Tipo</th>
            <th className="text-left p-3">Categoría</th>
            <th className="text-left p-3">Banco</th>
            <th className="text-left p-3">Monto</th>
            <th
              className="text-left p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors select-none flex items-center gap-1"
              onClick={onSort}
            >
              Fecha
              {sortOrder === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              )}
            </th>
            <th className="text-left p-3">Nota</th>
            <th className="text-left p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center text-gray-500 dark:text-gray-400 p-6"
              >
                No hay transacciones registradas aún.
              </td>
            </tr>
          ) : (
            transactions.map(tx => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
