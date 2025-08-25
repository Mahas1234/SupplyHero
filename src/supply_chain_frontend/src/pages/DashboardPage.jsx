"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Users, Activity, TrendingUp, Plus, Search } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import LoadingSpinner from "../components/LoadingSpinner"

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalEvents: 0,
    activeProducts: 0,
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [recentEvents, setRecentEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalUsers: 42,
        totalEvents: 1247,
        activeProducts: 134,
      })

      setRecentProducts([
        { id: "PRD001", name: "Organic Coffee Beans", status: "In Transit", location: "Port of Miami" },
        { id: "PRD002", name: "Electronic Components", status: "Delivered", location: "Austin, TX" },
        { id: "PRD003", name: "Medical Supplies", status: "Processing", location: "Chicago, IL" },
      ])

      setRecentEvents([
        { id: "EVT001", type: "Shipment", product: "Organic Coffee Beans", timestamp: "2 hours ago" },
        { id: "EVT002", type: "Quality Check", product: "Electronic Components", timestamp: "4 hours ago" },
        { id: "EVT003", type: "Delivery", product: "Medical Supplies", timestamp: "6 hours ago" },
      ])

      setLoading(false)
    }, 1500)
  }, [])

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Supply Events",
      value: stats.totalEvents,
      icon: Activity,
      color: "bg-purple-500",
      change: "+24%",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+16%",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{stat.change} from last month</p>
                </div>
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/register-product"
              className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Register Product</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add new product to chain</p>
              </div>
            </Link>

            <Link
              to="/track-product"
              className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <Search className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Track Product</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Search and track items</p>
              </div>
            </Link>

            <Link
              to="/supply-events"
              className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Supply Events</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage chain events</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Products</h2>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.id}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : product.status === "In Transit"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {product.status}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Events</h2>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{event.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.product}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{event.timestamp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
