export function ProjectsRow({row}){
    return (
        <tr className="text-sm px-[15px] py-[12px] rounded-bl-lg rounded-br-lg bg-gray-800">
            <td className="text-left p-[10px]">2000</td>
            <td className="text-left p-[10px]">12/12/2025</td>
            <td className="text-left p-[10px]">$ 50.000</td>
            <td className="text-left p-[10px]">$ 150.000</td>
            <td className="text-left p-[10px]">Para soat de carro</td>
            <td className="text-left p-[10px]">
                <div>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </div>
            </td>
        </tr>
    )
}