import { useEffect, useState } from "react"

export default function Header() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const options = { weekday: "long", day: "numeric", month: "long" }
    setDate(now.toLocaleDateString("es-CO", options))
  }, [])

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
        Welcome 👋 User
      </h2>
      <p className="text-gray-500 dark:text-gray-400 capitalize">{date}</p>
    </header>
  )
}
