import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

// Páginas
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Task from "./pages/Task"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"


export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/task" element={<Task />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
