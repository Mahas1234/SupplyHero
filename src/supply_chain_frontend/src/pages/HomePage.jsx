"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Package, Search, Users, BarChart3, QrCode, FileText, Shield, Truck, Globe, ArrowRight } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle.jsx"

const HomePage = () => {
  const features = [
    {
      icon: Package,
      title: "Product Registration",
      description: "Register and manage products in the supply chain",
      link: "/register-product",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Search,
      title: "Track Products",
      description: "Track products throughout their journey",
      link: "/track-product",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Truck,
      title: "Supply Events",
      description: "Monitor and record supply chain events",
      link: "/supply-events",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Register and manage system users",
      link: "/user-registration",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: QrCode,
      title: "QR Generator",
      description: "Generate QR codes for products",
      link: "/qr-generator",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: FileText,
      title: "PDF Reports",
      description: "Export detailed PDF reports",
      link: "/pdf-reports",
      color: "from-red-500 to-red-600",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Search and analyze supply chain data",
      link: "/search-analytics",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Users,
      title: "User Profiles",
      description: "Manage user profiles and permissions",
      link: "/user-profiles",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supply Chain Transparency</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Powered by Internet Computer</p>
            </div>
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transparent Supply Chain
            <span className="block text-blue-600 dark:text-blue-400">Management System</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Track, verify, and manage your supply chain with blockchain technology. Ensure transparency, authenticity,
            and trust throughout your product journey.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/track-product"
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Track Product
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage and track your supply chain with complete transparency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={feature.link}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Transparent Tracking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Real-time Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                <Globe size={32} className="inline" />
              </div>
              <div className="text-gray-600 dark:text-gray-400">Global Network</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2024 Supply Chain Transparency System. Built on Internet Computer.
        </p>
      </footer>
    </div>
  )
}

export default HomePage
