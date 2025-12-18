import { formatCOP } from "../../utils/formatMoney";
import { formatDateISOToHuman } from "../../utils/formatDate";

export function ProjectsRow({ row, onEdit, onDelete }) {
    const projected = parseFloat(row.projectedValue) || 0;
    const entered = parseFloat(row.enteredValue) || 0;
    const remaining = projected - entered;

    return (
        <tr className="text-sm border-t border-slate-700/60 hover:bg-slate-800/60 transition-colors bg-gray-800">
            <td className="text-left p-[10px] text-slate-100">{formatCOP(projected)}</td>
            <td className="text-left p-[10px] text-slate-400">{formatDateISOToHuman(row.date)}</td>
            <td className="text-left p-[10px] text-slate-100">{formatCOP(entered)}</td>
            <td className="text-left p-[10px] text-slate-100 font-semibold">{formatCOP(remaining)}</td>
            <td className="text-left p-[10px] text-slate-300">{row.note || "—"}</td>
            <td className="text-left p-[10px]">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(row)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors"
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(row.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-bold"
                    >
                        ×
                    </button>
                </div>
            </td>
        </tr>
    )
}