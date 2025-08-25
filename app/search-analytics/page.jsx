"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { SearchAndFilter } from "@/components/SearchAndFilter"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, BarChart3, TrendingUp, Search, MapPin, Package, Activity } from "lucide-react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import Link from "next/link"

export default function SearchAnalyticsPage() {
  const [searchResults, setSearchResults] = useState([])
  const [analytics, setAnalytics] = useState({
    totalProducts: 1234,
    totalEvents: 5678,
    activeLocations: 89,
    averageTransitTime: 12,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load initial data
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    // Simulate loading analytics data
    setAnalytics({
      totalProducts: 1234,
      totalEvents: 5678,
      activeLocations: 89,
      averageTransitTime: 12,
    })
  }

  const handleSearch = async (searchTerm) => {
    setLoading(true)
    try {
      // Simulate search API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockResults = [
        {
          id: "PROD001",
          name: "Organic Coffee Beans",
          status: "InTransit",
          location: "Distribution Center, Miami",
          producer: "Colombian Coffee Co.",
          lastUpdate: "2024-01-25T16:45:00Z",
        },
        {
          id: "PROD002",
          name: "Fair Trade Chocolate",
          status: "AtRetailer",
          location: "Retail Store, New York",
          producer: "Ecuador Cacao Ltd.",
          lastUpdate: "2024-01-24T12:30:00Z",
        },
        {
          id: "PROD003",
          name: "Sustainable Cotton",
          status: "Delivered",
          location: "Consumer, California",
          producer: "India Textiles Inc.",
          lastUpdate: "2024-01-23T09:15:00Z",
        },
      ].filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      setSearchResults(mockResults)
      toast.success(`Found ${mockResults.length} results for "${searchTerm}"`)
    } catch (error) {
      toast.error("Search failed")
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = async (filters) => {
    setLoading(true)
    try {
      // Simulate filter API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      let filteredResults = [
        {
          id: "PROD001",
          name: "Organic Coffee Beans",
          status: "InTransit",
          location: "Distribution Center, Miami",
          producer: "Colombian Coffee Co.",
          lastUpdate: "2024-01-25T16:45:00Z",
        },
        {
          id: "PROD002",
          name: "Fair Trade Chocolate",
          status: "AtRetailer",
          location: "Retail Store, New York",
          producer: "Ecuador Cacao Ltd.",
          lastUpdate: "2024-01-24T12:30:00Z",
        },
      ]

      if (filters.status) {
        filteredResults = filteredResults.filter((product) => product.status === filters.status)
      }

      if (filters.location) {
        filteredResults = filteredResults.filter((product) =>
          product.location.toLowerCase().includes(filters.location.toLowerCase()),
        )
      }

      setSearchResults(filteredResults)
      toast.success(`Applied filters - ${filteredResults.length} results`)
    } catch (error) {
      toast.error("Filter failed")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchResults([])
    toast.success("Search cleared")
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
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/80 dark:bg-gray-800/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-pink-600 to-rose-600 p-4 rounded-full shadow-lg">
                <Filter className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Search & Analytics</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced search, filtering, and analytics for comprehensive supply chain data insights
            </p>
          </motion.div>

          {/* Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                title: "Total Products",
                value: analytics.totalProducts.toLocaleString(),
                icon: Package,
                color: "text-pink-600",
                change: "+12%",
              },
              {
                title: "Supply Chain Events",
                value: analytics.totalEvents.toLocaleString(),
                icon: Activity,
                color: "text-rose-600",
                change: "+8%",
              },
              {
                title: "Active Locations",
                value: analytics.activeLocations,
                icon: MapPin,
                color: "text-purple-600",
                change: "+5%",
              },
              {
                title: "Avg Transit Time",
                value: `${analytics.averageTransitTime} days`,
                icon: BarChart3,
                color: "text-blue-600",
                change: "-3%",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          {stat.change} from last month
                        </div>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} onClear={handleClear} />
          </motion.div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Results ({searchResults.length})
                  </CardTitle>
                  <CardDescription>Products matching your search criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium">{product.name}</h4>
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Package className="h-3 w-3 mr-1" />
                              ID: {product.id}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {product.location}
                            </div>
                            <div className="flex items-center">
                              <Activity className="h-3 w-3 mr-1" />
                              {new Date(product.lastUpdate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full mx-auto"
                />
                <p className="text-muted-foreground">Searching...</p>
              </div>
            </motion.div>
          )}

          {/* Analytics Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Analytics Features</CardTitle>
                <CardDescription>Powerful insights from your supply chain data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Real-time Search", description: "Instant search across all blockchain records" },
                    { title: "Advanced Filtering", description: "Filter by status, location, date, and more" },
                    { title: "Performance Metrics", description: "Track KPIs and supply chain efficiency" },
                    { title: "Trend Analysis", description: "Identify patterns and trends over time" },
                    { title: "Custom Reports", description: "Generate reports based on search results" },
                    { title: "Data Export", description: "Export filtered data in multiple formats" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      className="p-4 border rounded-lg transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-medium mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
