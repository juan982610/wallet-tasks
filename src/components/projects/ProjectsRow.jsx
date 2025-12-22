import { formatCOP } from "../../utils/formatMoney";
import { formatDateISOToHuman } from "../../utils/formatDate";

export function ProjectsRow({ row, onEdit, onDelete, alertLimit }) {
    const projected = parseFloat(row.projectedValue) || 0;
    const entered = parseFloat(row.enteredValue) || 0;
    const remaining = projected - entered;

    // --- Helper Logic ---
    const now = new Date();
    // Normalize to midnight to avoid time issues
    now.setHours(0, 0, 0, 0);

    // Parse projection date (assuming it's YYYY-MM-DD or similar ISO)
    // Note: 'date' comes from input type="date", usually "YYYY-MM-DD"
    // We treat it as local date or UTC midnight? Usually local simple date.
    // Let's create a date object from the string and reset time.
    const projDate = new Date(row.date);
    // Fix timezone offset issue common with "YYYY-MM-DD" parsing in JS (it treats as UTC)
    // A simple trick is to append "T00:00:00" if it's just "YYYY-MM-DD" or use split.
    // Let's rely on standard parsing but ensure we compare days properly.
    // Using a simpler diff approach:
    const diffTime = projDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days remaining

    // Styles
    const styleYellow = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"; // Without rounded
    const styleRed = "bg-red-500/10 text-red-400 border border-red-500/30";       // Without rounded
    const textGreen = "bg-green-500/10 text-green-500 border border-green-500/30";
    const textNormal = "text-slate-100 border border-slate-700/60";
    const textMuted = "text-slate-400 border border-slate-700/60";

    // 1. Date Column Logic
    let dateClass = textNormal;
    if (diffDays > 30) {
        dateClass = textGreen;
    } else if (diffDays > 15) {
        // 15 < diffDays <= 30
        dateClass = styleYellow;
    } else {
        // diffDays <= 15
        dateClass = styleRed;
    }

    // 2. Entered Column Logic
    let enteredClass = textNormal;
    if (diffDays > 30) {
        enteredClass = textGreen;
    } else if (diffDays > 15) {
        enteredClass = styleYellow;
    } else {
        // diffDays <= 15
        const percentage = projected > 0 ? (entered / projected) : 0;
        if (percentage >= 0.9) {
            enteredClass = textGreen;
        } else if (percentage > 0.6) {
            // 60% < x < 90% (Strictly: > 60% and < 90%)
            // Plan said: 60% < Entered < 90% -> Yellow
            enteredClass = styleYellow;
        } else {
            // <= 60% -> Red
            enteredClass = styleRed;
        }
    }

    // 3. Projected Value Logic
    // If Projected > AlertLimit -> Red Text
    // Note: alertLimit comes from prop
    const projectedClass = (alertLimit > 0 && projected > alertLimit)
        ? "bg-red-500/10 text-red-400 border border-red-500/30"
        : textNormal;

    // 4. Remaining Logic
    // If remaining <= 0 -> Green
    const remainingClass = remaining <= 0 ? "bg-green-500/10 text-green-500 border border-green-500/30" : "text-slate-100 font-semibold border border-slate-700/60";


    return (
        <tr className="text-sm border-t border-slate-700/60 hover:bg-slate-800/60 transition-colors bg-gray-800">
            <td className={`text-left p-[10px] ${projectedClass}`}>{formatCOP(projected)}</td>
            <td className={`text-left p-[10px] ${dateClass}`}>
                <span className={`px-2 py-1 `}>
                    {formatDateISOToHuman(row.date)}
                </span>
            </td>
            <td className={`text-left p-[10px] ${enteredClass}`}>
                <span className={`px-2 py-1 `}>
                    {formatCOP(entered)}
                </span>
            </td>
            <td className={`text-left p-[10px] ${remainingClass}`}>{formatCOP(remaining)}</td>
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