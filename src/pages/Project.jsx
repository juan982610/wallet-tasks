import { useState } from "react"
import { StatsCard } from "../components/transactions/StatsCard"
import { ProjectTable } from "../components/projects/ProjectTable"
import { ProjectionModal } from "../components/projects/ProjectionModal"
import { getProjections, createProjections } from "../services/projectionService"

export default function Projects() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [table, setTable] = useState(() => getProjections());

  function addProyections(newData) {
    const proyectioNew = createProjections(newData)
    setTable(prev => [proyectioNew, ...prev])
  }

  const handleSave = (data) => {
    addProyections(data)
  }

  return <>
    <div className="flex flex-row w-full justify-between items-center">
      <h1 className="font-bold text-[22px]">Proyección</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-[10px] bg-blue-600 rounded-lg text-white hover:bg-blue-700 hover:cursor-pointer transition-colors"
      >
        + Agregar proyección
      </button>
    </div>

    <div className="mt-[20px] gap-[20px] md:grid md:grid-cols-3">

      <StatsCard
        label="Proyectado"
        amount={0}
        colortext="[#ff7a00]"
      />
      <StatsCard
        label="Ingresado"
        amount={0}
        colortext="green-600"
      />
      <StatsCard
        label="Restante"
        amount={0}
      />
    </div>

    <ProjectTable
      rows={table}
    />
    <ProjectionModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSave}
    />
  </>
}