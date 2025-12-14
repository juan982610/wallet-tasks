export default function ProjectTable(){
    return ( 
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Valor proyectado</th>
                        <th>Fecha de proyección</th>
                        <th>Ingresado</th>
                        <th>Restante</th>
                        <th>Nota</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={7}>
                            No hay proyecciones aún
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}