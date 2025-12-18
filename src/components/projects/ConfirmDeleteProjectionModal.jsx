
export function ConfirmDeleteProjectionModal({ isOpen, onConfirm, onCancel }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="border border-gray-700 rounded-[30px] p-[24px] bg-gray-800 absolute w-[420px] flex flex-col items-center gap-[20px]">
                <h2 className="center text-white font-bold text-lg">¿Seguro deseas eliminar esta proyección?</h2>
                <p className="text-gray-400 center flex flex-col items-center justify-center text-center">
                    Esta acción no se puede deshacer. <span>¿Deseas continuar?</span>
                </p>
                <div className="flex gap-[20px]">
                    <button
                        className="border rounded-lg bg-gray-800 border-gray-700 px-[20px] py-[6px] hover:cursor-pointer text-white transition-colors hover:bg-gray-700"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="rounded-lg bg-red-600 px-[20px] py-[6px] hover:cursor-pointer text-white hover:bg-red-700 transition-colors"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
