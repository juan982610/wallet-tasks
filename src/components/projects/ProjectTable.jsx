import { ProjectsRow } from "./ProjectsRow"

import { useState, useEffect } from "react"
export function ProjectTable({ rows, onEdit, onDelete, sortOrder, onSort, filter, onFilterChange, alertLimit, onSaveAlertLimit }) {
    const [localLimit, setLocalLimit] = useState(alertLimit);

    useEffect(() => {
        setLocalLimit(alertLimit);
    }, [alertLimit]);

    const handleLimitChange = (e) => {
        setLocalLimit(e.target.value);
    };

    const saveLimit = () => {
        onSaveAlertLimit(Number(localLimit));
    };

    const renderSortIcon = (field) => {
        if (sortOrder.field !== field) return <svg className="opacity-30" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>; // Default or neutral icon if needed, or nothing. 
        // Showing arrow down for desc, arrow up for asc generic usually.
        // TransactionsTable logic: asc -> arrow up (m18 15...), desc -> arrow down (m6 9...)
        if (sortOrder.direction === 'asc') {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        }
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    }

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nota..."
                    className="mb-[20px] w-full md:w-1/3 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-700"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                />

                <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4">
                    <span className="text-sm text-gray-400">Alerta Global:</span>
                    <input
                        type="number"
                        className="w-24 bg-gray-800 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-sm"
                        value={localLimit}
                        onChange={handleLimitChange}
                        placeholder="0"
                    />
                    <button
                        onClick={saveLimit}
                        className="p-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                        title="Guardar Alerta"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                    </button>
                    <span className="text-xs text-gray-500 ml-1">
                        (Guardado: {alertLimit})
                    </span>
                </div>
            </div>

            <table className="w-full overflow-hidden rounded-lg">
                <thead>
                    <tr className="text-sm bg-gray-700 ">
                        <th
                            className="text-left p-[10px] cursor-pointer hover:bg-gray-600 transition-colors select-none"
                            onClick={() => onSort('projectedValue')}
                        >
                            <div className="flex items-center gap-1">
                                Valor proyectado
                                {renderSortIcon('projectedValue')}
                            </div>
                        </th>
                        <th
                            className="text-left p-[10px] cursor-pointer hover:bg-gray-600 transition-colors select-none"
                            onClick={() => onSort('date')}
                        >
                            <div className="flex items-center gap-1">
                                Fecha de proyección
                                {renderSortIcon('date')}
                            </div>
                        </th>
                        <th className="text-left p-[10px]">Ingresado</th>
                        <th className="text-left p-[10px]">Restante</th>
                        <th className="text-left p-[10px]">Nota</th>
                        <th className="text-left p-[10px]">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="bg-gray-800 text-center rounded-br-lg rounded-bl-lg py-[20px] text-gray-400"
                            >
                                {filter ? "No se encontraron proyecciones con ese filtro." : "No hay proyecciones aún"}
                            </td>
                        </tr>
                    ) : (
                        rows.map(row => (
                            <ProjectsRow
                                key={row.id}
                                row={row}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                alertLimit={alertLimit}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}