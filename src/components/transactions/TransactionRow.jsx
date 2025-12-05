import { formatCOP } from "../../utils/formatMoney";
import { formatDateISOToHuman } from "../../utils/formatDate";

export function TransactionRow({ tx, onEdit, onDelete }) {
  return (
    <tr className="border-t border-slate-700/60 hover:bg-slate-800/60 transition-colors">
      {/* Tipo */}
      <td className="p-3">
        <span
          className={
            tx.type === "ingreso"
              ? "inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30"
              : "inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30"
          }
        >
          {tx.type === "ingreso" ? "Ingreso" : "Gasto"}
        </span>
      </td>

      {/* Categoría */}
      <td className="p-3 text-slate-100">
        {tx.category}
      </td>

        {/* bank */}
      <td className="p-3 text-slate-100">
        {tx.bank}
      </td>

      {/* Monto */}
      <td className="p-3 font-semibold text-slate-100">
        {formatCOP(tx.amount)}
      </td>

      {/* Fecha */}
      <td className="p-3 text-slate-400 text-sm">
        {formatDateISOToHuman(tx.date)}
      </td>

      {/* Nota */}
      <td className="p-3 text-slate-300 text-sm">
        {tx.note || "—"}
      </td>

      {/* Acciones */}
      <td className="p-3">
        <div className="flex items-center gap-2">
          {/* Editar */}
          <button
            type="button"
            onClick={() => onEdit(tx)}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors"
          >
            Editar
          </button>

          {/* Eliminar */}
          <button
            type="button"
            onClick={() => onDelete(tx.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-bold"
          >
            ×
          </button>
        </div>
      </td>
    </tr>
  );
}
