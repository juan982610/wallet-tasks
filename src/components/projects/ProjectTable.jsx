import { ProjectsRow } from "./ProjectsRow"

export function ProjectTable({rows}){
    return ( 
        <div>
            <table className="w-full mt-[20px] overflow-hidden rounded-lg">
                <thead>
                    <tr className="text-sm bg-gray-700 ">
                        <th className="text-left p-[10px]">Valor proyectado</th>
                        <th className="text-left p-[10px]">Fecha de proyección</th>
                        <th className="text-left p-[10px]">Ingresado</th>
                        <th className="text-left p-[10px]">Restante</th>
                        <th className="text-left p-[10px]">Nota</th>
                        <th className="text-left p-[10px]">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {1 === 2 ?  (
                    <tr>
                        <td 
                        colSpan={7}
                        className="bg-gray-800 text-center rounded-br-lg rounded-bl-lg py-[10px] text-gray-400">
                            No hay proyecciones aún
                        </td>
                    </tr>
                    ) : (
                        <ProjectsRow 
                        
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}