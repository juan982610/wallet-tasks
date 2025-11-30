import { useState } from "react";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../services/transactionsService";


export function useTransactions() {

  const [transactions, setTransactions] = useState(() => getTransactions());

  function addTransaction(data) {
    const newTx = createTransaction(data);
    setTransactions(prev => [...prev, newTx]);
  }

  function editTransaction(id, patch) {
    const updatedList = updateTransaction(id, patch);
    setTransactions(updatedList);
  }

  function removeTransaction(id) {
    const updatedList = deleteTransaction(id);
    setTransactions(updatedList);
  }

  return {
    transactions,
    addTransaction,
    editTransaction,
    removeTransaction,
  };
}