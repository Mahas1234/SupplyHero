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
  Package,
  Shield,
  Globe,
  CheckCircle,
  Upload,
  Calendar,
  MapPin,
  User,
  Hash,
  FileText,
} from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Immutable Records",
    description: "Once registered, product data cannot be altered or deleted, ensuring permanent authenticity.",
  },
  {
    icon: CheckCircle,
    title: "Instant Verification",
    description: "Products can be instantly verified by any stakeholder in the supply chain.",
  },
  {
    icon: Globe,
    title: "Global Transparency",
    description: "Product information is accessible worldwide, promoting trust and accountability.",
  },
]

const steps = [
  {
    number: "01",
    title: "Product Information",
    description: "Enter basic product details including name, description, and category",
  },
  {
    number: "02",
    title: "Origin Details",
    description: "Specify manufacturing location, date, and responsible parties",
  },
  {
    number: "03",
    title: "Blockchain Registration",
    description: "Product is registered on ICP blockchain with unique identifier",
  },
  {
    number: "04",
    title: "QR Code Generation",
    description: "Unique QR code is generated for easy product tracking and verification",
  },
]

export default function RegisterProductPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    manufacturer: "",
    origin: "",
    batchNumber: "",
    manufacturingDate: "",
    expiryDate: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Product registered successfully on blockchain!")

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        manufacturer: "",
        origin: "",
        batchNumber: "",
        manufacturingDate: "",
        expiryDate: "",
      })
    } catch (error) {
      toast.error("Failed to register product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-emerald-900/20 dark:to-teal-900/20">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Register Product
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Register Your Product on Blockchain</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create an immutable record of your product on the Internet Computer Protocol blockchain. Ensure
              authenticity, traceability, and transparency throughout the supply chain.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
              >
                <benefit.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Registration Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                      {step.number}
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-green-500" />
                Product Registration Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-green-500" />
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Hash className="w-4 h-4 mr-2 text-green-500" />
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select category</option>
                      <option value="food">Food & Beverages</option>
                      <option value="electronics">Electronics</option>
                      <option value="textiles">Textiles</option>
                      <option value="pharmaceuticals">Pharmaceuticals</option>
                      <option value="automotive">Automotive</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-green-500" />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Describe your product"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-green-500" />
                      Manufacturer *
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Manufacturer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      Origin Location *
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Hash className="w-4 h-4 mr-2 text-green-500" />
                      Batch Number
                    </label>
                    <input
                      type="text"
                      name="batchNumber"
                      value={formData.batchNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Batch/Lot number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-500" />
                      Manufacturing Date *
                    </label>
                    <input
                      type="date"
                      name="manufacturingDate"
                      value={formData.manufacturingDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-500" />
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5 mr-2" />
                        Register Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
