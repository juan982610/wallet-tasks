import { useState, useEffect } from "react"

export function ProjectionModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        projectedValue: "",
        date: "",
        enteredValue: "",
        note: ""
    })

    // Resetear formulario cuando se abre el modal
    useEffect(() => {
        if (isOpen) {
            setFormData({
                projectedValue: "",
                date: "",
                enteredValue: "",
                note: ""
            })
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Validación básica
        if (!formData.projectedValue || !formData.date) {
            alert("Por favor completa los campos obligatorios")
            return
        }

        onSave(formData)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[500px] rounded-[20px] bg-gray-900 px-[25px] py-[30px]">
                <div className="relative mb-[5px] w-full h-[40px]">
                    <button
                        onClick={onClose}
                        className="absolute right-[-13px] text-[24px] text-gray-400 top-[-25px] hover:text-white"
                    >
                        ×
                    </button>
                    <h2 className="font-bold text-[20px] text-white">Agregar Proyectado</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                    <div>
                        <input
                            name="projectedValue"
                            value={formData.projectedValue}
                            onChange={handleChange}
                            placeholder="Valor Proyectado"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white border border-transparent focus:border-blue-500 outline-none"
                            type="number"
                        />
                    </div>
                    <div>
                        <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="Fecha de proyección"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white scheme-dark border border-transparent focus:border-blue-500 outline-none"
                            type="date"
                        />
                    </div>
                    <div>
                        <input
                            name="enteredValue"
                            value={formData.enteredValue}
                            onChange={handleChange}
                            placeholder="Ingresado"
                            className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px] text-white border border-transparent focus:border-blue-500 outline-none"
                            type="number"
                        />
                    </div>
                    <div>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Nota (opcional)"
                            className="w-full bg-gray-800 p-[10px] rounded-[5px] resize-none text-white h-[80px] border border-transparent focus:border-blue-500 outline-none"
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
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}