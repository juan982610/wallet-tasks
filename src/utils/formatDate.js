
export function formatDateISOToHuman(iso) {
  // iso esperado: 'YYYY-MM-DD'
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m - 1), d);
  return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}