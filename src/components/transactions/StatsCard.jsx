import { formatCOP } from "../../utils/formatMoney";



export function StatsCard({ label, amount, colortext}) {
  const colorClassTetx = colortext ?? "white";
  console.log(colorClassTetx)

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold text-${colorClassTetx}`}>
        {formatCOP(amount)}
      </p>
    </div>
  );
}