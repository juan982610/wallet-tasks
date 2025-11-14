const STORAGE_KEY = 'wallet_tasks_transactions';

export function getTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


export function saveTransactions(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}


export function createTransaction(data) {
  // data esperado: { type: 'gasto'|'ingreso', category, amount(Number), date(YYYY-MM-DD), note }
  const list = getTransactions();
  const tx = {
    id: crypto.randomUUID(),      // id único
    ...data,
  };
  const next = [tx, ...list];     // insertamos al inicio por UX
  saveTransactions(next);
  return tx;
}


export function deleteTransaction(id) {
  const list = getTransactions();
  const next = list.filter(t => t.id !== id);
  saveTransactions(next);
  return next;
}


export function updateTransaction(id, patch) {
  const list = getTransactions();
  const next = list.map(t => (t.id === id ? { ...t, ...patch } : t));
  saveTransactions(next);
  return next.find(t => t.id === id);
}