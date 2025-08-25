"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Toaster, toast } from "react-hot-toast"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  Plus,
  MapPin,
  User,
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

const eventTypes = [
  {
    type: "manufacturing",
    label: "Manufacturing",
    icon: Package,
    color: "blue",
    description: "Product creation and initial processing",
  },
  {
    type: "quality_check",
    label: "Quality Check",
    icon: CheckCircle,
    color: "green",
    description: "Quality assurance and testing procedures",
  },
  {
    type: "shipping",
    label: "Shipping",
    icon: Truck,
    color: "purple",
    description: "Transportation and logistics events",
  },
  {
    type: "storage",
    label: "Storage",
    icon: Package,
    color: "orange",
    description: "Warehousing and storage activities",
  },
  {
    type: "inspection",
    label: "Inspection",
    icon: Eye,
    color: "indigo",
    description: "Regulatory and compliance inspections",
  },
  {
    type: "alert",
    label: "Alert",
    icon: AlertTriangle,
    color: "red",
    description: "Issues, delays, or anomalies",
  },
]

const mockEvents = [
  {
    id: 1,
    type: "manufacturing",
    title: "Product Manufacturing Started",
    description: "Organic Coffee Beans production initiated at Green Farms facility",
    location: "Green Farms, Colombia",
    timestamp: "2024-01-01T08:00:00Z",
    productId: "PR-2024-001",
    responsible: "John Martinez",
    status: "completed",
  },
  {
    id: 2,
    type: "quality_check",
    title: "Quality Assurance Passed",
    description: "All quality parameters met industry standards",
    location: "Green Farms, Colombia",
    timestamp: "2024-01-02T10:30:00Z",
    productId: "PR-2024-001",
    responsible: "Maria Rodriguez",
    status: "completed",
  },
  {
    id: 3,
    type: "shipping",
    title: "Shipment Dispatched",
    description: "Product shipped via cargo vessel to North America",
    location: "Port of Cartagena, Colombia",
    timestamp: "2024-01-05T14:15:00Z",
    productId: "PR-2024-001",
    responsible: "Carlos Silva",
    status: "completed",
  },
  {
    id: 4,
    type: "storage",
    title: "Arrived at Distribution Center",
    description: "Product received and stored at Chicago distribution facility",
    location: "Distribution Center, Chicago",
    timestamp: "2024-01-12T09:45:00Z",
    productId: "PR-2024-001",
    responsible: "Sarah Johnson",
    status: "in_progress",
  },
  {
    id: 5,
    type: "alert",
    title: "Temperature Alert",
    description: "Slight temperature variation detected in storage unit",
    location: "Distribution Center, Chicago",
    timestamp: "2024-01-13T15:20:00Z",
    productId: "PR-2024-002",
    responsible: "Mike Wilson",
    status: "pending",
  },
]

export default function SupplyEventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedType, setSelectedType] = useState("all")
  const [newEvent, setNewEvent] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    productId: "",
    responsible: "",
  })

  const filteredEvents = selectedType === "all" ? events : events.filter((event) => event.type === selectedType)

  const getEventTypeConfig = (type) => {
    return eventTypes.find((et) => et.type === type) || eventTypes[0]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "in_progress":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      case "pending":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const event = {
        id: events.length + 1,
        ...newEvent,
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      setEvents([event, ...events])
      setNewEvent({
        type: "",
        title: "",
        description: "",
        location: "",
        productId: "",
        responsible: "",
      })
      setShowAddForm(false)
      toast.success("Event added successfully!")
    } catch (error) {
      toast.error("Failed to add event")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-slate-900 dark:via-orange-900/20 dark:to-red-900/20">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Supply Chain Events
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Supply Chain Event Management</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Track, manage, and verify all events in your supply chain with blockchain-powered transparency and
              immutable record keeping.
            </p>
          </motion.div>

          {/* Event Types Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Event Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map((eventType, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                >
                  <eventType.icon className={`w-12 h-12 mx-auto mb-4 text-${eventType.color}-500`} />
                  <h4 className="font-semibold mb-2">{eventType.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{eventType.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Filter by type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                {eventTypes.map((type) => (
                  <option key={type.type} value={type.type}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Event
            </button>
          </motion.div>

          {/* Add Event Form */}
          {showAddForm && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6">Add New Event</h3>

                <form onSubmit={handleAddEvent} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type *</label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((type) => (
                          <option key={type.type} value={type.type}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Product ID *</label>
                      <input
                        type="text"
                        value={newEvent.productId}
                        onChange={(e) => setNewEvent({ ...newEvent, productId: e.target.value })}
                        required
                        placeholder="e.g., PR-2024-001"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Event Title *</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                      placeholder="Brief title for the event"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                      rows={3}
                      placeholder="Detailed description of the event"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location *</label>
                      <input
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        required
                        placeholder="Event location"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Responsible Person *</label>
                      <input
                        type="text"
                        value={newEvent.responsible}
                        onChange={(e) => setNewEvent({ ...newEvent, responsible: e.target.value })}
                        required
                        placeholder="Person responsible"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Add Event
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Recent Events ({filteredEvents.length})</h3>

            {filteredEvents.map((event, index) => {
              const eventConfig = getEventTypeConfig(event.type)
              return (
                <div
                  key={event.id}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-${eventConfig.color}-100 dark:bg-${eventConfig.color}-900/30 rounded-lg flex items-center justify-center`}
                      >
                        <eventConfig.icon className={`w-6 h-6 text-${eventConfig.color}-500`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold">{event.title}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}
                          >
                            {event.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <User className="w-4 h-4 mr-2" />
                            {event.responsible}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Package className="w-4 h-4 mr-2" />
                            {event.productId}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(event.timestamp)}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
