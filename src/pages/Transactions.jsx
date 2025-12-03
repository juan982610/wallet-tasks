import { useState, useMemo  } from "react";
import { FilterChips } from "../components/transactions/FilterChips";
import { FiltersBar } from "../components/transactions/FiltersBar";
import { StatsCard } from "../components/transactions/StatsCard";
import categoryType from "../data/categoryType.json";
import transactionTypes from "../data/transactionTypes.json";
import { TransactionModal } from "../components/transactions/TransactionModal";
import { TransactionsTable } from "../components/transactions/TransactionsTable";
import { useTransactions } from "../hooks/useTransactions";



const initialForm = {
    type: "gasto",
    category: "",
    amount: "",
    date: "",
    note: ""
  }

export default function Transactions() {

  const {
  transactions,
  addTransaction,
  editTransaction,
  removeTransaction,
} = useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  

 const filteredTransactions = useMemo(() => {
  const search = searchTerm.toLowerCase().trim();

  return transactions.filter(tx => {
    if (filterType !== "all" && tx.type !== filterType) return false;

    // Categoría
    if (categoryFilter !== "all" && tx.category !== categoryFilter) return false;

    // Búsqueda por texto (categoría o nota)
    if (search) {
      const inCategory = tx.category?.toLowerCase().includes(search);
      if (!inCategory) return false;
    }

    // Rango de fechas (comparación simple de strings YYYY-MM-DD)
    if (dateFrom && tx.date < dateFrom) return false;
    if (dateTo && tx.date > dateTo) return false;

    return true;
  });
}, [transactions, filterType, categoryFilter, searchTerm, dateFrom, dateTo]);

  const totalIngresos = transactions
  .filter(tx => tx.type === "ingreso")
  .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalGastos = transactions
  .filter(tx => tx.type === "gasto")
  .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalProyectado = transactions
  .filter(tx => tx.category === "proyectado")
  .reduce((sum, tx) => sum + Number(tx.amount || 0),0)

  const balance = totalIngresos - totalGastos;

  function handleCloseForm(){
    setShowForm(false)
  }

  function validateForm(form){
    const newErrors = {};

    // Category
    if (!form.category.trim()) {
      newErrors.category = "La categoría o motivo es obligatoria.";
    }

    // Amount
    if (!form.amount) {
      newErrors.amount = "El monto es obligatorio.";
    } else if (isNaN(form.amount)) {
      newErrors.amount = "El monto debe ser numérico.";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "El monto debe ser mayor a 0.";
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

    if (!form.date) {
      newErrors.date = "La fecha es obligatoria.";
    } else if (!dateRegex.test(form.date)) {
      newErrors.date = "Formato de fecha inválido.";
    }

    return newErrors;

  }

  function handleOpenCreate(transacion = null){
  if (transacion) {
    // Modo edición

    setForm({
      ...transacion,
      amount: String(transacion.amount ?? ""),
    });
  } else {
    // Modo creación
    setForm(initialForm);
  }

  setErrors({});
  setShowForm(true);  
}
  
  function handleChange(e){

    const {name,value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }

  function handleSubmit(e){
    e.preventDefault();

    const validationErrors = validateForm(form);

    
    if (Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }
    
    if(form.id){
      editTransaction(form.id, form)
    }else{
      addTransaction(form);
    }

    setShowForm(false);
    setForm(initialForm);
    setErrors({}); 
  } 

  function handleDelete(id){
    removeTransaction(id);
  }

  return (
    <section className="space-y-6">
      {/* Header interno */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transacciones</h1>
        <button
          onClick={() => handleOpenCreate()}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          + Agregar transacción
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          label="Ingresos"
          amount={totalIngresos}
          variant="ingreso"
        />
        <StatsCard
          label="Gastos"
          amount={totalGastos}
          variant="gasto"
        />
        <StatsCard
          label="Balance"
          amount={balance}
          variant="neutral"
        />
        <StatsCard
          label="Proyectado"
          amount={totalProyectado}
          variant="proyectado"
        />

      </div>

      <FiltersBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        categories={categoryType}
        types={transactionTypes}
        filterType={filterType}
        onChangeType={setFilterType}
      />

      {/* Tabla / Lista */}
      <TransactionsTable
        transactions={filteredTransactions}
        onEdit={handleOpenCreate}
        onDelete={handleDelete}
      />


      <TransactionModal
        isOpen={showForm}
        form={form}
        errors={errors}
        onChange={handleChange}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        isEditing={Boolean(form.id)}
      />
    </section>
  )
}
