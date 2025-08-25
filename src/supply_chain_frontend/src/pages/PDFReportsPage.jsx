"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, FileText, Calendar, Package, Users } from "lucide-react"
import { motion } from "framer-motion"
import PDFExport from "../components/PDFExport.jsx"
import ThemeToggle from "../components/ThemeToggle.jsx"

const PDFReportsPage = () => {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [selectedReport, setSelectedReport] = useState("products")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls - replace with actual backend calls
    const fetchData = async () => {
      try {
        // Mock data for demonstration
        const mockProducts = [
          {
            id: "prod_1",
            name: "Organic Coffee Beans",
            description: "Premium organic coffee from Colombia",
            manufacturer: "Green Coffee Co.",
            status: "In Transit",
            current_location: "Distribution Center",
            created_at: Date.now() * 1000000,
          },
          {
            id: "prod_2",
            name: "Fair Trade Chocolate",
            description: "Ethically sourced dark chocolate",
            manufacturer: "Ethical Foods Ltd.",
            status: "Delivered",
            current_location: "Retail Store",
            created_at: (Date.now() - 86400000) * 1000000,
          },
        ]

        const mockUsers = [
          {
            id: "user_1",
            name: "John Smith",
            email: "john@example.com",
            role: "Manufacturer",
            created_at: Date.now() * 1000000,
          },
          {
            id: "user_2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            role: "Distributor",
            created_at: (Date.now() - 172800000) * 1000000,
          },
        ]

        setProducts(mockProducts)
        setUsers(mockUsers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const reportTypes = [
    { id: "products", name: "Products Report", icon: Package, data: products },
    { id: "users", name: "Users Report", icon: Users, data: users },
  ]

  const currentReport = reportTypes.find((report) => report.id === selectedReport)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FileText className="text-red-600" size={32} />
              PDF Reports
            </h1>
          </div>
          <ThemeToggle />
        </motion.div>

        {/* Report Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Select Report Type</h2>
          <div className="flex gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedReport === report.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Icon size={16} />
                  {report.name}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Export Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Export {currentReport?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Generate PDF reports for your supply chain data</p>
            </div>
            <PDFExport
              data={currentReport?.data}
              filename={`${selectedReport}-report-${new Date().toISOString().split("T")[0]}`}
              title={currentReport?.name}
            />
          </div>
        </motion.div>

        {/* Report Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
          id="export-content"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{currentReport?.name} Preview</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              {new Date().toLocaleDateString()}
            </div>
          </div>

          {currentReport?.data && currentReport.data.length > 0 ? (
            <div className="space-y-4">
              {currentReport.data.map((item, index) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.name || `${item.role} - ${item.name}`}
                      </h3>
                      {item.description && <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>}
                      {item.email && <p className="text-gray-600 dark:text-gray-400 mt-1">Email: {item.email}</p>}
                      <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {item.status && (
                          <span className="flex items-center gap-1">
                            Status: <span className="font-medium">{item.status}</span>
                          </span>
                        )}
                        {item.role && (
                          <span className="flex items-center gap-1">
                            Role: <span className="font-medium">{item.role}</span>
                          </span>
                        )}
                        {(item.current_location || item.location) && (
                          <span className="flex items-center gap-1">
                            Location: <span className="font-medium">{item.current_location || item.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <div>#{index + 1}</div>
                      {item.created_at && (
                        <div className="mt-1">{new Date(Number(item.created_at) / 1000000).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No data available for {currentReport?.name.toLowerCase()}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PDFReportsPage
