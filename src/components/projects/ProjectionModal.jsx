import { useState, useEffect } from "react"

export function ProjectionModal({ isOpen, onClose, onSave, projectionToEdit }) {
    const [formData, setFormData] = useState({
        projectedValue: "",
        date: "",
        enteredValue: "",
        note: ""
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isOpen) {
            if (projectionToEdit) {
                setFormData({
                    projectedValue: projectionToEdit.projectedValue || "",
                    date: projectionToEdit.date || "",
                    enteredValue: projectionToEdit.enteredValue || "",
                    note: projectionToEdit.note || ""
                })
            } else {
                setFormData({
                    projectedValue: "",
                    date: "",
                    enteredValue: "",
                    note: ""
                })
            }
            setErrors({})
        }
    }, [isOpen, projectionToEdit])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.projectedValue) newErrors.projectedValue = "El valor proyectado es requerido"
        if (!formData.date) newErrors.date = "La fecha de proyección es requerida"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            onSave(formData)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[500px] rounded-[20px] bg-gray-900 px-[25px] py-[30px] border border-gray-800">
                <div className="relative mb-[5px] w-full h-[40px]">
                    <button
                        onClick={onClose}
                        className="absolute right-[-13px] text-[24px] text-gray-400 top-[-25px] hover:text-white"
                    >
                        ×
                    </button>
                    <h2 className="font-bold text-[20px] text-white">
                        {projectionToEdit ? "Editar Proyección" : "Agregar Proyectado"}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                    <div>
                        <input
                            name="projectedValue"
                            value={formData.projectedValue}
                            onChange={handleChange}
                            placeholder="Valor Proyectado"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white border border-transparent focus:border-blue-500 outline-none placeholder-gray-500"
                            type="number"
                        />
                        {errors.projectedValue && (
                            <p className="text-red-400 text-xs mt-1">{errors.projectedValue}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="Fecha de proyección"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white scheme-dark border border-transparent focus:border-blue-500 outline-none placeholder-gray-500"
                            type="date"
                        />
                        {errors.date && (
                            <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="enteredValue"
                            value={formData.enteredValue}
                            onChange={handleChange}
                            placeholder="Ingresado"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white border border-transparent focus:border-blue-500 outline-none placeholder-gray-500"
                            type="number"
                        />
                    </div>
                    <div>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Nota (opcional)"
                            className="w-full bg-gray-800 p-[10px] rounded-[5px] resize-none text-white h-[80px] border border-transparent focus:border-blue-500 outline-none placeholder-gray-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                        >
                            {projectionToEdit ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}