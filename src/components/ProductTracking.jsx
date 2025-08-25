"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, User, Truck, CheckCircle } from "lucide-react"
import { LoadingSpinner } from "./LoadingSpinner"
import { QRCodeModal } from "./QRCodeModal"
import { PDFExport } from "./PDFExport"
import toast from "react-hot-toast"

export function ProductTracking() {
  const [productId, setProductId] = useState("")
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [trackingHistory, setTrackingHistory] = useState([])

  const handleSearch = async () => {
    if (!productId.trim()) {
      toast.error("Please enter a product ID")
      return
    }

    setLoading(true)
    try {
      // Simulate API call to ICP backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockProduct = {
        id: productId,
        name: "Organic Coffee Beans",
        description: "Premium organic coffee beans sourced from sustainable farms",
        producer: "Colombian Coffee Co.",
        created_at: "2024-01-15T10:30:00Z",
        current_location: "Distribution Center, Miami",
        status: "AtDistributor",
      }

      const mockHistory = [
        {
          id: "event_1",
          event_type: "Produced",
          location: "Coffee Farm, Colombia",
          timestamp: "2024-01-15T10:30:00Z",
          actor: "Colombian Coffee Co.",
          metadata: "Product registered and produced",
        },
        {
          id: "event_2",
          event_type: "QualityCheck",
          location: "Processing Plant, Colombia",
          timestamp: "2024-01-16T14:20:00Z",
          actor: "Quality Inspector",
          metadata: "Quality inspection passed - Grade A",
        },
        {
          id: "event_3",
          event_type: "Shipped",
          location: "Port of Cartagena, Colombia",
          timestamp: "2024-01-18T09:15:00Z",
          actor: "Shipping Company",
          metadata: "Shipped via container ship SS-Colombia",
        },
        {
          id: "event_4",
          event_type: "Received",
          location: "Distribution Center, Miami",
          timestamp: "2024-01-25T16:45:00Z",
          actor: "Distribution Partner",
          metadata: "Received at distribution center for further processing",
        },
      ]

      setProductDetails(mockProduct)
      setTrackingHistory(mockHistory)
      toast.success("Product found successfully!")
    } catch (error) {
      console.error("Error fetching product data:", error)
      toast.error("Product not found")
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
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "QualityCheck":
        return <CheckCircle className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Registered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "InTransit":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "AtDistributor":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "AtRetailer":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
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
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Track Product</span>
          </CardTitle>
          <CardDescription>Enter a product ID to view its complete supply chain journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="trackingId">Product ID</Label>
              <Input
                id="trackingId"
                placeholder="e.g., PROD001"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="transition-all duration-200 hover:shadow-md"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Track
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {productDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card className="lg:col-span-1 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <div className="flex space-x-2 mt-2">
                  <QRCodeModal productId={productDetails.id} productName={productDetails.name} />
                  <PDFExport product={productDetails} events={trackingHistory} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Product ID</Label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{productDetails.id}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="font-medium">{productDetails.name}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-sm">{productDetails.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Producer</Label>
                  <p className="text-sm flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {productDetails.producer}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Current Location</Label>
                  <p className="text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {productDetails.current_location}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(productDetails.status)}>{productDetails.status}</Badge>
                </motion.div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
                <CardDescription>Complete tracking history from blockchain records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingHistory.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative"
                    >
                      {index < trackingHistory.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start space-x-4 p-4 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                          {getEventIcon(event.event_type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{event.event_type}</h4>
                            <Badge variant="outline" className="text-xs">
                              {new Date(event.timestamp).toLocaleDateString()}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>

                          <p className="text-sm text-muted-foreground flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {event.actor}
                          </p>

                          {event.metadata && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-sm mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                            >
                              {event.metadata}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
