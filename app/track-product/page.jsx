"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { QRCodeModal } from "@/components/QRCodeModal"
import { PDFExport } from "@/components/PDFExport"
import { Toaster, toast } from "react-hot-toast"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  QrCode,
  FileText,
  Eye,
  Calendar,
  Building,
} from "lucide-react"

const mockTrackingData = {
  productId: "PR-2024-001",
  productName: "Organic Coffee Beans",
  currentStatus: "In Transit",
  currentLocation: "Distribution Center, Chicago",
  estimatedDelivery: "2024-01-15",
  timeline: [
    {
      id: 1,
      status: "Manufactured",
      location: "Green Farms, Colombia",
      timestamp: "2024-01-01T08:00:00Z",
      description: "Product manufactured and quality tested",
      completed: true,
      icon: Package,
    },
    {
      id: 2,
      status: "Quality Check",
      location: "Green Farms, Colombia",
      timestamp: "2024-01-02T10:30:00Z",
      description: "Passed all quality assurance tests",
      completed: true,
      icon: CheckCircle,
    },
    {
      id: 3,
      status: "Shipped",
      location: "Port of Cartagena, Colombia",
      timestamp: "2024-01-05T14:15:00Z",
      description: "Shipped via cargo vessel",
      completed: true,
      icon: Truck,
    },
    {
      id: 4,
      status: "In Transit",
      location: "Distribution Center, Chicago",
      timestamp: "2024-01-12T09:45:00Z",
      description: "Currently at distribution center",
      completed: true,
      icon: MapPin,
      current: true,
    },
    {
      id: 5,
      status: "Out for Delivery",
      location: "Local Delivery Hub",
      timestamp: null,
      description: "Will be dispatched for final delivery",
      completed: false,
      icon: Truck,
    },
    {
      id: 6,
      status: "Delivered",
      location: "Final Destination",
      timestamp: null,
      description: "Product delivered to customer",
      completed: false,
      icon: CheckCircle,
    },
  ],
  productDetails: {
    manufacturer: "Green Farms Co.",
    batchNumber: "GF-2024-001",
    manufacturingDate: "2024-01-01",
    category: "Food & Beverages",
    weight: "1 kg",
    temperature: "22°C",
  },
}

export default function TrackProductPage() {
  const [searchId, setSearchId] = useState("")
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchId.trim()) {
      toast.error("Please enter a product ID")
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setTrackingData(mockTrackingData)
      toast.success("Product found!")
    } catch (error) {
      toast.error("Product not found")
      setTrackingData(null)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "Pending"
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Track Product
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Track Your Product Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Monitor your product's complete journey through the supply chain with real-time updates and
              blockchain-verified transparency.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Search className="w-6 h-6 mr-2 text-purple-500" />
                Enter Product ID
              </h3>

              <form onSubmit={handleSearch} className="flex space-x-4">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Product ID (e.g., PR-2024-001)"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Track
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Try searching for: PR-2024-001 (demo product)
              </p>
            </div>
          </motion.div>

          {/* Tracking Results */}
          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Product Overview */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{trackingData.productName}</h3>
                    <p className="text-gray-600 dark:text-gray-300">ID: {trackingData.productId}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowQRModal(true)}
                      className="flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </button>
                    <PDFExport
                      data={trackingData}
                      filename={`tracking-${trackingData.productId}`}
                      className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export PDF
                    </PDFExport>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                      <p className="font-semibold text-green-600">{trackingData.currentStatus}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Location</p>
                      <p className="font-semibold">{trackingData.currentLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Est. Delivery</p>
                      <p className="font-semibold">{trackingData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-500" />
                  Product Journey Timeline
                </h3>

                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          event.completed
                            ? event.current
                              ? "bg-purple-500 text-white"
                              : "bg-green-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                        }`}
                      >
                        <event.icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-semibold ${
                              event.completed
                                ? event.current
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-green-600 dark:text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {event.status}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(event.timestamp)}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-1">{event.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-purple-500" />
                  Product Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manufacturer</p>
                      <p className="font-medium">{trackingData.productDetails.manufacturer}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Batch Number</p>
                      <p className="font-medium">{trackingData.productDetails.batchNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manufacturing Date</p>
                      <p className="font-medium">{trackingData.productDetails.manufacturingDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                      <p className="font-medium">{trackingData.productDetails.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                      <p className="font-medium">{trackingData.productDetails.weight}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                      <p className="font-medium">{trackingData.productDetails.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* QR Code Modal */}
        {showQRModal && trackingData && (
          <QRCodeModal
            isOpen={showQRModal}
            onClose={() => setShowQRModal(false)}
            productId={trackingData.productId}
            productName={trackingData.productName}
          />
        )}
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
