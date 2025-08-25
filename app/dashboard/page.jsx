"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Toaster } from "react-hot-toast"
import Link from "next/link"
import {
  ArrowLeft,
  Package,
  Truck,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

const mockData = {
  totalProducts: 1247,
  activeShipments: 89,
  registeredUsers: 342,
  pendingAlerts: 12,
  recentActivity: [
    {
      id: 1,
      type: "product_registered",
      message: "New product registered: Organic Coffee Beans",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "shipment_update",
      message: "Shipment SC-001 location updated",
      time: "5 minutes ago",
      status: "info",
    },
    {
      id: 3,
      type: "user_registered",
      message: "New supplier registered: Green Farms Co.",
      time: "10 minutes ago",
      status: "success",
    },
    {
      id: 4,
      type: "alert",
      message: "Temperature alert for shipment SC-002",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 5,
      type: "verification",
      message: "Product verification completed for PR-456",
      time: "20 minutes ago",
      status: "success",
    },
  ],
  performanceMetrics: {
    transparency: 98.5,
    efficiency: 94.2,
    compliance: 99.1,
    satisfaction: 96.8,
  },
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(mockData)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome to Your Supply Chain Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your supply chain operations in real-time with blockchain-powered transparency
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                  <p className="text-3xl font-bold text-blue-600">{data.totalProducts.toLocaleString()}</p>
                </div>
                <Package className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Shipments</p>
                  <p className="text-3xl font-bold text-green-600">{data.activeShipments}</p>
                </div>
                <Truck className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Registered Users</p>
                  <p className="text-3xl font-bold text-purple-600">{data.registeredUsers}</p>
                </div>
                <Users className="w-12 h-12 text-purple-500" />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Alerts</p>
                  <p className="text-3xl font-bold text-orange-600">{data.pendingAlerts}</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-500" />
                  Recent Activity
                </h3>
                <Link href="/supply-events" className="text-blue-500 hover:text-blue-600 text-sm">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-orange-500"
                            : activity.status === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                    {activity.status === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {activity.status === "warning" && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                    {activity.status === "error" && <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Performance Metrics
                </h3>
                <Link href="/search-analytics" className="text-blue-500 hover:text-blue-600 text-sm">
                  View Analytics
                </Link>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-500" />
                      Transparency Score
                    </span>
                    <span className="text-sm font-bold text-blue-600">{data.performanceMetrics.transparency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${data.performanceMetrics.transparency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      Efficiency Rate
                    </span>
                    <span className="text-sm font-bold text-green-600">{data.performanceMetrics.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${data.performanceMetrics.efficiency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-purple-500" />
                      Compliance Score
                    </span>
                    <span className="text-sm font-bold text-purple-600">{data.performanceMetrics.compliance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${data.performanceMetrics.compliance}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-orange-500" />
                      User Satisfaction
                    </span>
                    <span className="text-sm font-bold text-orange-600">{data.performanceMetrics.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${data.performanceMetrics.satisfaction}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/register-product"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
              >
                <Package className="w-8 h-8 text-blue-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Register New Product</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add products to blockchain</p>
                </div>
              </Link>

              <Link
                href="/track-product"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors group"
              >
                <Truck className="w-8 h-8 text-green-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Track Shipment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monitor product journey</p>
                </div>
              </Link>

              <Link
                href="/user-registration"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors group"
              >
                <Users className="w-8 h-8 text-purple-500 mr-3 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Add New User</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Register stakeholders</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
