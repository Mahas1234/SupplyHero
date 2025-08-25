"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Activity, Plus, Filter, Calendar, MapPin, User } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import LoadingSpinner from "../components/LoadingSpinner"
import toast from "react-hot-toast"

const SupplyEventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [newEvent, setNewEvent] = useState({
    productId: "",
    type: "",
    location: "",
    description: "",
    actor: "",
  })

  const mockEvents = [
    {
      id: "EVT001",
      productId: "PRD123456",
      productName: "Organic Coffee Beans",
      type: "Shipment",
      location: "Port of Miami",
      timestamp: "2024-01-22T16:45:00Z",
      description: "Product shipped to distribution center",
      actor: "Shipping Manager",
    },
    {
      id: "EVT002",
      productId: "PRD789012",
      productName: "Electronic Components",
      type: "Quality Check",
      location: "Austin Manufacturing",
      timestamp: "2024-01-22T14:30:00Z",
      description: "Quality inspection completed successfully",
      actor: "Quality Inspector",
    },
    {
      id: "EVT003",
      productId: "PRD345678",
      productName: "Medical Supplies",
      type: "Delivery",
      location: "Chicago Hospital",
      timestamp: "2024-01-22T12:15:00Z",
      description: "Final delivery to end customer",
      actor: "Delivery Driver",
    },
  ]

  useEffect(() => {
    // Simulate loading events
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1500)
  }, [])

  const handleAddEvent = async (e) => {
    e.preventDefault()

    const eventData = {
      id: "EVT" + Date.now().toString().slice(-6),
      ...newEvent,
      timestamp: new Date().toISOString(),
      productName: "Product Name", // This would come from backend
    }

    setEvents((prev) => [eventData, ...prev])
    setNewEvent({
      productId: "",
      type: "",
      location: "",
      description: "",
      actor: "",
    })
    setShowAddForm(false)
    toast.success("Event added successfully!")
  }

  const filteredEvents = events.filter(
    (event) => filterType === "all" || event.type.toLowerCase() === filterType.toLowerCase(),
  )

  const getEventColor = (type) => {
    switch (type) {
      case "Shipment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Quality Check":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Delivery":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "Registration":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <Activity className="h-8 w-8 text-orange-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supply Chain Events</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event Management</h2>
              <p className="text-gray-600 dark:text-gray-300">Track and manage supply chain events in real-time</p>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  <option value="all">All Events</option>
                  <option value="shipment">Shipment</option>
                  <option value="quality check">Quality Check</option>
                  <option value="delivery">Delivery</option>
                  <option value="registration">Registration</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Event
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Event Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Event</h3>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product ID</label>
                  <input
                    type="text"
                    value={newEvent.productId}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, productId: e.target.value }))}
                    className="input-field"
                    placeholder="Enter product ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, type: e.target.value }))}
                    className="input-field"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="Registration">Registration</option>
                    <option value="Quality Check">Quality Check</option>
                    <option value="Shipment">Shipment</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Customs">Customs</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="Enter location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Actor</label>
                  <input
                    type="text"
                    value={newEvent.actor}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, actor: e.target.value }))}
                    className="input-field"
                    placeholder="Enter actor name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="input-field"
                  placeholder="Enter event description"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Add Event
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.id}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {event.productName} ({event.productId})
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {event.actor}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          >
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Events Found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {filterType === "all"
                ? "No supply chain events have been recorded yet."
                : `No ${filterType} events found.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SupplyEventsPage
