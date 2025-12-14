import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"

// Páginas
import Transactions from "./pages/Transactions"
import Project from "./pages/Project"



export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
