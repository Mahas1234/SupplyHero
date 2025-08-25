"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Truck, Store, CheckCircle, Clock, MapPin, User, X } from "lucide-react"
import { LoadingSpinner } from "./LoadingSpinner"
import toast from "react-hot-toast"

export function SupplyChainEvents() {
  const [events, setEvents] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    product_id: "",
    event_type: "",
    location: "",
    metadata: "",
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    // Simulate loading events from ICP backend
    const mockEvents = [
      {
        id: "event_1",
        product_id: "PROD001",
        event_type: "Produced",
        location: "Coffee Farm, Colombia",
        timestamp: "2024-01-15T10:30:00Z",
        actor: "Colombian Coffee Co.",
        metadata: "Product registered and produced",
      },
      {
        id: "event_2",
        product_id: "PROD001",
        event_type: "QualityCheck",
        location: "Processing Plant, Colombia",
        timestamp: "2024-01-16T14:20:00Z",
        actor: "Quality Inspector",
        metadata: "Quality inspection passed - Grade A",
      },
      {
        id: "event_3",
        product_id: "PROD002",
        event_type: "Shipped",
        location: "Port of Cartagena, Colombia",
        timestamp: "2024-01-18T09:15:00Z",
        actor: "Shipping Company",
        metadata: "Shipped via container ship SS-Colombia",
      },
      {
        id: "event_4",
        product_id: "PROD001",
        event_type: "Received",
        location: "Distribution Center, Miami",
        timestamp: "2024-01-25T16:45:00Z",
        actor: "Distribution Partner",
        metadata: "Received at distribution center",
      },
    ]
    setEvents(mockEvents)
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call to add_supply_chain_event
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newEvent = {
        id: `event_${Date.now()}`,
        ...formData,
        timestamp: new Date().toISOString(),
        actor: "Current User", // In real app, this would be from user context
      }

      setEvents((prev) => [newEvent, ...prev])
      setFormData({
        product_id: "",
        event_type: "",
        location: "",
        metadata: "",
      })
      setShowAddForm(false)
      toast.success("Supply chain event added successfully!", {
        icon: "📦",
        duration: 4000,
      })
    } catch (error) {
      console.error("Error adding event:", error)
      toast.error("Failed to add event")
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case "Produced":
        return <Package className="h-4 w-4 text-blue-600" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-yellow-600" />
      case "Received":
        return <Store className="h-4 w-4 text-purple-600" />
      case "QualityCheck":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getEventColor = (eventType) => {
    switch (eventType) {
      case "Produced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Shipped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Received":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "QualityCheck":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supply Chain Events</h2>
          <p className="text-muted-foreground">All blockchain-recorded events across the supply chain network</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="transition-all duration-200 hover:shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Add Supply Chain Event</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddForm(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </CardTitle>
                <CardDescription>Record a new event in the blockchain supply chain</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="productId">Product ID</Label>
                      <Input
                        id="productId"
                        placeholder="e.g., PROD001"
                        value={formData.product_id}
                        onChange={(e) => setFormData((prev) => ({ ...prev, product_id: e.target.value }))}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select
                        value={formData.event_type}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, event_type: value }))}
                      >
                        <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Produced">Produced</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="QualityCheck">Quality Check</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Distribution Center, Miami"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="metadata">Event Details</Label>
                    <Textarea
                      id="metadata"
                      placeholder="Additional details about this event..."
                      value={formData.metadata}
                      onChange={(e) => setFormData((prev) => ({ ...prev, metadata: e.target.value }))}
                      rows={3}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex space-x-2"
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Adding to Blockchain...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Event
                          </>
                        )}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest supply chain events recorded on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="border rounded-lg p-4 space-y-3 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {getEventIcon(event.event_type)}
                    </motion.div>
                    <div>
                      <h4 className="font-medium">{event.event_type}</h4>
                      <p className="text-sm text-muted-foreground">Product: {event.product_id}</p>
                    </div>
                  </div>
                  <Badge className={getEventColor(event.event_type)}>{event.event_type}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {event.actor}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>

                {event.metadata && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm"
                  >
                    {event.metadata}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
