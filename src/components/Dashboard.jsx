"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, Store, CheckCircle, Clock, MapPin, TrendingUp } from "lucide-react"
import { ProductRegistration } from "./ProductRegistration"
import { ProductTracking } from "./ProductTracking"
import { SupplyChainEvents } from "./SupplyChainEvents"
import { SearchAndFilter } from "./SearchAndFilter"
import { ThemeToggle } from "./ThemeToggle"
import { LoadingSpinner } from "./LoadingSpinner"
import toast from "react-hot-toast"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Dashboard() {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    inTransit: 0,
    delivered: 0,
    totalEvents: 0,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulate API calls to ICP backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStats({
        totalProducts: 1234,
        inTransit: 89,
        delivered: 1089,
        totalEvents: 5678,
      })

      setProducts([
        { id: "PROD001", name: "Organic Coffee Beans", location: "Colombia", status: "InTransit" },
        { id: "PROD002", name: "Fair Trade Chocolate", location: "Ecuador", status: "AtRetailer" },
        { id: "PROD003", name: "Sustainable Cotton", location: "India", status: "Delivered" },
      ])

      toast.success("Dashboard loaded successfully!")
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    toast.success(`Searching for: ${searchTerm}`)
  }

  const handleFilter = (filters) => {
    toast.success(`Filtering by: ${JSON.stringify(filters)}`)
  }

  const handleClear = () => {
    toast.success("Filters cleared")
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Registered":
        return <Package className="h-4 w-4" />
      case "InTransit":
        return <Truck className="h-4 w-4" />
      case "AtDistributor":
        return <Store className="h-4 w-4" />
      case "AtRetailer":
        return <Store className="h-4 w-4" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <LoadingSpinner size="xl" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Supply Chain Dashboard
          </h1>
          <p className="text-muted-foreground">Blockchain-powered transparency and traceability</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="px-3 py-1 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected to ICP
          </Badge>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants}>
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} onClear={handleClear} />
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Products",
            value: stats.totalProducts,
            icon: Package,
            color: "text-blue-600",
            change: "+12%",
          },
          { title: "In Transit", value: stats.inTransit, icon: Truck, color: "text-yellow-600", change: "+5%" },
          { title: "Delivered", value: stats.delivered, icon: CheckCircle, color: "text-green-600", change: "+18%" },
          {
            title: "Supply Chain Events",
            value: stats.totalEvents,
            icon: Clock,
            color: "text-purple-600",
            change: "+25%",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-transparent hover:border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="transition-all duration-200">
              Overview
            </TabsTrigger>
            <TabsTrigger value="register" className="transition-all duration-200">
              Register Product
            </TabsTrigger>
            <TabsTrigger value="track" className="transition-all duration-200">
              Track Products
            </TabsTrigger>
            <TabsTrigger value="events" className="transition-all duration-200">
              Supply Chain Events
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                    <CardDescription>Latest products registered in the supply chain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(product.status)}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {product.location}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Supply Chain Activity</CardTitle>
                    <CardDescription>Recent events across the supply chain network</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { event: "Product shipped from warehouse", time: "2 hours ago", type: "Shipped" },
                      { event: "Quality check completed", time: "4 hours ago", type: "QualityCheck" },
                      { event: "Product received at distributor", time: "6 hours ago", type: "Received" },
                      { event: "New product registered", time: "8 hours ago", type: "Produced" },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start space-x-3 p-3 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                      >
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full mt-2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.event}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductRegistration />
              </motion.div>
            </TabsContent>

            <TabsContent value="track">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductTracking />
              </motion.div>
            </TabsContent>

            <TabsContent value="events">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SupplyChainEvents />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
