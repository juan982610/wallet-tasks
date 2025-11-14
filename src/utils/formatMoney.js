export function formatCOP(value) {
  // Acepta Number o String numérica
  const num = Number(value) || 0;
  return num.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}