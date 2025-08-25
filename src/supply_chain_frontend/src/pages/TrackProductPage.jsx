"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Search, MapPin, Clock, Package, Truck } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import LoadingSpinner from "../components/LoadingSpinner"

const TrackProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const mockTrackingData = {
    id: "PRD123456",
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans from Colombia",
    manufacturer: "Colombian Coffee Co.",
    currentLocation: "Miami Distribution Center",
    status: "In Transit",
    events: [
      {
        id: 1,
        type: "Registration",
        location: "Bogotá, Colombia",
        timestamp: "2024-01-15T08:00:00Z",
        description: "Product registered in supply chain",
        actor: "Colombian Coffee Co.",
      },
      {
        id: 2,
        type: "Quality Check",
        location: "Bogotá Processing Plant",
        timestamp: "2024-01-16T10:30:00Z",
        description: "Quality inspection passed",
        actor: "Quality Inspector",
      },
      {
        id: 3,
        type: "Shipment",
        location: "Port of Cartagena",
        timestamp: "2024-01-18T14:00:00Z",
        description: "Shipped via cargo vessel",
        actor: "Shipping Company",
      },
      {
        id: 4,
        type: "Customs",
        location: "Port of Miami",
        timestamp: "2024-01-22T09:15:00Z",
        description: "Customs clearance completed",
        actor: "Customs Officer",
      },
      {
        id: 5,
        type: "Arrival",
        location: "Miami Distribution Center",
        timestamp: "2024-01-22T16:45:00Z",
        description: "Arrived at distribution center",
        actor: "Warehouse Manager",
      },
    ],
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes("prd") || searchQuery.toLowerCase().includes("coffee")) {
        setSearchResults(mockTrackingData)
      } else {
        setSearchResults(null)
      }
      setLoading(false)
    }, 1500)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getEventIcon = (type) => {
    switch (type) {
      case "Registration":
        return Package
      case "Shipment":
        return Truck
      case "Arrival":
        return MapPin
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <Search className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Product</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Track Your Product</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter a product ID or name to track its journey through the supply chain
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                placeholder="Enter Product ID (e.g., PRD123456) or product name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" className="mr-2" /> : <Search className="w-5 h-5 mr-2" />}
              {loading ? "Searching..." : "Track Product"}
            </button>
          </form>
        </motion.div>

        {/* Search Results */}
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Product Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{searchResults.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{searchResults.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Product ID</span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{searchResults.id}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Manufacturer</span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {searchResults.manufacturer}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Location</span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {searchResults.currentLocation}
                      </p>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    searchResults.status === "Delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : searchResults.status === "In Transit"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  }`}
                >
                  {searchResults.status}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Supply Chain Journey</h3>
              <div className="relative">
                {searchResults.events.map((event, index) => {
                  const IconComponent = getEventIcon(event.type)
                  const isLast = index === searchResults.events.length - 1

                  return (
                    <div key={event.id} className="relative flex items-start mb-8 last:mb-0">
                      {!isLast && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                      )}

                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{event.type}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(event.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="mr-4">{event.location}</span>
                          <span>by {event.actor}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {searchQuery && !loading && !searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Product Found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We couldn't find a product with ID or name "{searchQuery}". Please check your input and try again.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TrackProductPage
