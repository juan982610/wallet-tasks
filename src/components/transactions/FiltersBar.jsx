export function FiltersBar({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  categories,
  types,
  filterType,
  onChangeType
}) {

  function getCategoriesByType(filterType){
     if (filterType === "all") {
        return categories.flatMap(group => group.items);
    }
    
    const group = categories.find(g => g.titulo === filterType);
    return group ? group.items : [];
  }

  const filterCategories = getCategoriesByType(filterType)

  return (
    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 items-end mb-4">


      {/* Tipos */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Tipo
        </label>
        <select
          className="p-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700"
          value={filterType}
          onChange={e => onChangeType(e.target.value)}
        >
          <option value="all">Todas</option>
          {types.map(type =>(
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
           
        </select>
      </div>

      

      {/* Categoría */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Categoría
        </label>
        <select
          value={categoryFilter}
          onChange={e => onCategoryChange(e.target.value)}
          className="p-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700"
        >
          
          <option value="all">Todas</option>
          {
            filterCategories.map(item => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buscar */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Buscar (categoría o nota)
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Ej: arriendo, mercado..."
          className="p-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Desde */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Desde
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={e => onDateFromChange(e.target.value)}
          className="p-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Hasta */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Hasta
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={e => onDateToChange(e.target.value)}
          className="p-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

    </div>
  );
}
