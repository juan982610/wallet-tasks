import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/transactions", label: "Transactions" },
    { to: "/task", label: "Task" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ]

  return (
    <aside className="bg-gray-100 dark:bg-gray-800 w-full md:w-64 h-auto md:h-screen p-4 flex md:flex-col gap-3 shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        WalletTasks 💸
      </h1>
      <nav className="flex flex-wrap md:flex-col gap-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className = {({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
