export function ProjectionModal(){
    return (
        <div  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[500px] rounded-[20px] bg-gray-900 px-[25px] py-[30px]">
                <div className="relative mb-[5px] w-full h-[40px]">
                    <button className="absolute right-[-13px] text-[24px] text-gray-400 top-[-25px]">×</button>
                    <h2 className="font-bold text-[20px]">Agregar Proyectado</h2>
                </div>
                <form className="flex flex-col gap-[20px]">
                    <div>
                        <input 
                        placeholder="Valor Proyectado" 
                        className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px]" 
                        type="text" />
                    </div>
                    <div>
                        <input 
                        placeholder="Fecha de proyección" 
                        className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px]" 
                        type="date" />
                    </div>
                    <div>
                        <input 
                        placeholder="Ingresado"
                         className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px]" 
                         type="text" />
                    </div>
                    <div>
                        <input 
                        placeholder="Restante" 
                        className="w-full bg-gray-800 h-[40px] px-[10px] py-[20px] rounded-[5px]" 
                        type="text" />
                    </div>
                    <div>
                        <textarea 
                        placeholder="Nota" 
                        className="w-full bg-gray-800 p-[10px] rounded-[5px] resize-none" 
                        type="text-area"/>
                    </div>
                </form>
            </div>
        </div>     
    )
}