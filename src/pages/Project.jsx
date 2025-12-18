import { useState } from "react"
import { StatsCard } from "../components/transactions/StatsCard"
import { ProjectTable } from "../components/projects/ProjectTable"
import { ProjectionModal } from "../components/projects/ProjectionModal"
import { ConfirmDeleteProjectionModal } from "../components/projects/ConfirmDeleteProjectionModal"
import { useProjections } from "../hooks/useProjections"

export default function Projects() {
  const {
    projections,
    addProjection,
    editProjection,
    removeProjection,
    filter,
    setFilter,
    sortOrder,
    handleSort,
    stats
  } = useProjections();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProjection, setSelectedProjection] = useState(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  const handleOpenAdd = () => {
    setSelectedProjection(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (projection) => {
    setSelectedProjection(projection)
    setIsModalOpen(true)
  }

  const handleSave = (data) => {
    if (selectedProjection) {
      editProjection(selectedProjection.id, data)
    } else {
      addProjection(data)
    }
    setIsModalOpen(false)
  }

  const handleOpenDelete = (id) => {
    setIdToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (idToDelete) {
      removeProjection(idToDelete)
    }
    setIsDeleteModalOpen(false)
    setIdToDelete(null)
  }

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="font-bold text-[22px]">Proyección</h1>
        <button
          onClick={handleOpenAdd}
          className="p-[10px] bg-blue-600 rounded-lg text-white hover:bg-blue-700 hover:cursor-pointer transition-colors"
        >
          + Agregar proyección
        </button>
      </div>

      <div className="my-[20px] gap-[20px] md:grid md:grid-cols-3">
        <StatsCard
          label="Proyectado"
          amount={stats.totalProjected}
          colortext="[#ff7a00]"
        />
        <StatsCard
          label="Ingresado"
          amount={stats.totalEntered}
          colortext="green-600"
        />
        <StatsCard
          label="Restante"
          amount={stats.totalRemaining}
        />
      </div>

      <ProjectTable
        rows={projections}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        sortOrder={sortOrder}
        onSort={handleSort}
        filter={filter}
        onFilterChange={setFilter}
      />

      <ProjectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        projectionToEdit={selectedProjection}
      />

      <ConfirmDeleteProjectionModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}