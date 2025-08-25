"use client"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Toaster } from "react-hot-toast"
import Link from "next/link"
import {
  Package,
  Search,
  Users,
  BarChart3,
  QrCode,
  FileText,
  Shield,
  Truck,
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
} from "lucide-react"

const features = [
  {
    title: "Dashboard",
    description: "Overview of your supply chain operations",
    icon: BarChart3,
    href: "/dashboard",
    color: "from-blue-500 to-cyan-500",
    stats: "Real-time insights",
  },
  {
    title: "Register Product",
    description: "Add new products to the blockchain",
    icon: Package,
    href: "/register-product",
    color: "from-green-500 to-emerald-500",
    stats: "Immutable records",
  },
  {
    title: "Track Product",
    description: "Monitor product journey in real-time",
    icon: Truck,
    href: "/track-product",
    color: "from-purple-500 to-violet-500",
    stats: "End-to-end visibility",
  },
  {
    title: "Supply Events",
    description: "Manage supply chain events and milestones",
    icon: Shield,
    href: "/supply-events",
    color: "from-orange-500 to-red-500",
    stats: "Verified events",
  },
  {
    title: "User Registration",
    description: "Register stakeholders in the supply chain",
    icon: Users,
    href: "/user-registration",
    color: "from-pink-500 to-rose-500",
    stats: "Secure access",
  },
  {
    title: "QR Generator",
    description: "Generate QR codes for products",
    icon: QrCode,
    href: "/qr-generator",
    color: "from-indigo-500 to-blue-500",
    stats: "Instant verification",
  },
  {
    title: "PDF Reports",
    description: "Generate comprehensive reports",
    icon: FileText,
    href: "/pdf-reports",
    color: "from-teal-500 to-green-500",
    stats: "Professional docs",
  },
  {
    title: "Search & Analytics",
    description: "Advanced search and data analytics",
    icon: Search,
    href: "/search-analytics",
    color: "from-yellow-500 to-orange-500",
    stats: "Smart insights",
  },
  {
    title: "User Profiles",
    description: "Manage user profiles and permissions",
    icon: Users,
    href: "/user-profiles",
    color: "from-cyan-500 to-blue-500",
    stats: "Role management",
  },
]

const benefits = [
  {
    icon: CheckCircle,
    title: "Immutable Records",
    description: "All transactions are permanently recorded on the blockchain",
  },
  {
    icon: Globe,
    title: "Global Transparency",
    description: "Real-time visibility across the entire supply chain",
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "Cryptographic security ensures data integrity",
  },
]

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ICP Supply Chain
              </h1>
            </motion.div>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Supply Chain
                <br />
                Transparency
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Revolutionize your supply chain with blockchain technology. Track, verify, and manage products with
                complete transparency and security.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <benefit.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Explore Features</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose from our comprehensive suite of supply chain management tools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={feature.href}>
                    <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <feature.icon className="w-12 h-12 text-blue-500 group-hover:text-white transition-colors duration-300" />
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {feature.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-3">{feature.description}</p>

                        <div className="text-sm text-blue-500 font-medium">{feature.stats}</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 ICP Supply Chain. Built on Internet Computer Protocol.
            </p>
          </div>
        </footer>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
