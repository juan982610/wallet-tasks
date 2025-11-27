export function FilterChips({ value, onChange }) {
  return (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => onChange("all")}
        className={`px-3 py-1 rounded-full text-xs font-semibold
          ${value === "all"
            ? "bg-slate-700 text-white"
            : "bg-slate-800 text-slate-300"
          }`}
      >
        Todos
      </button>

      <button
        onClick={() => onChange("ingreso")}
        className={`px-3 py-1 rounded-full text-xs font-semibold
          ${value === "ingreso"
            ? "bg-green-600 text-white"
            : "bg-slate-800 text-green-300"
          }`}
      >
        Ingresos
      </button>

      <button
        onClick={() => onChange("gasto")}
        className={`px-3 py-1 rounded-full text-xs font-semibold
          ${value === "gasto"
            ? "bg-red-600 text-white"
            : "bg-slate-800 text-red-300"
          }`}
      >
        Gastos
      </button>
    </div>
  );
}