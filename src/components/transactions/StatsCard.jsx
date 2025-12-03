import { formatCOP } from "../../utils/formatMoney";

const variantStyles = {
  ingreso: "text-green-600",
  gasto: "text-red-600",
  proyectado: "text-blue-600",
  neutral: ""
};

export function StatsCard({ label, amount, variant = "neutral" }) {
  const colorClass = variantStyles[variant] ?? variantStyles.neutral;

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {formatCOP(amount)}
      </p>
    </div>
  );
}