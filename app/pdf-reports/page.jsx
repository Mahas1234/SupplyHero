"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileDown, FileText, BarChart3, Shield, Clock, Globe } from "lucide-react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import jsPDF from "jspdf"
import Link from "next/link"

export default function PDFReportsPage() {
  const [reportType, setReportType] = useState("")
  const [productId, setProductId] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [generating, setGenerating] = useState(false)

  const generateReport = async () => {
    if (!reportType) {
      toast.error("Please select a report type")
      return
    }

    setGenerating(true)

    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const pdf = new jsPDF()

      // Header
      pdf.setFontSize(20)
      pdf.text("Supply Chain Report", 20, 30)

      // Report details based on type
      pdf.setFontSize(14)
      pdf.text(`Report Type: ${reportType}`, 20, 50)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 60)

      if (productId) {
        pdf.text(`Product ID: ${productId}`, 20, 70)
      }

      if (dateRange) {
        pdf.text(`Date Range: ${dateRange}`, 20, 80)
      }

      // Sample content based on report type
      let yPosition = 100
      pdf.setFontSize(16)

      switch (reportType) {
        case "product-journey":
          pdf.text("Product Journey Report", 20, yPosition)
          yPosition += 20
          pdf.setFontSize(12)
          pdf.text("1. Product Registered - Colombia Coffee Farm", 25, yPosition)
          pdf.text("   Date: 2024-01-15 | Actor: Colombian Coffee Co.", 25, yPosition + 10)
          yPosition += 30
          pdf.text("2. Quality Check Passed - Processing Plant", 25, yPosition)
          pdf.text("   Date: 2024-01-16 | Actor: Quality Inspector", 25, yPosition + 10)
          yPosition += 30
          pdf.text("3. Shipped - Port of Cartagena", 25, yPosition)
          pdf.text("   Date: 2024-01-18 | Actor: Shipping Company", 25, yPosition + 10)
          break

        case "compliance":
          pdf.text("Compliance Report", 20, yPosition)
          yPosition += 20
          pdf.setFontSize(12)
          pdf.text("✓ All products have complete audit trails", 25, yPosition)
          yPosition += 15
          pdf.text("✓ Quality checks performed at required intervals", 25, yPosition)
          yPosition += 15
          pdf.text("✓ Blockchain records are immutable and verified", 25, yPosition)
          break

        case "analytics":
          pdf.text("Supply Chain Analytics", 20, yPosition)
          yPosition += 20
          pdf.setFontSize(12)
          pdf.text("Total Products Tracked: 1,234", 25, yPosition)
          yPosition += 15
          pdf.text("Average Transit Time: 12 days", 25, yPosition)
          yPosition += 15
          pdf.text("On-time Delivery Rate: 94%", 25, yPosition)
          yPosition += 15
          pdf.text("Quality Check Pass Rate: 98%", 25, yPosition)
          break

        default:
          pdf.text("General Supply Chain Report", 20, yPosition)
          yPosition += 20
          pdf.setFontSize(12)
          pdf.text("This report contains supply chain data and analytics", 25, yPosition)
      }

      // Footer
      pdf.setFontSize(10)
      pdf.text(`Generated on ${new Date().toLocaleString()}`, 20, pdf.internal.pageSize.height - 20)
      pdf.text("Powered by ICP Blockchain Supply Chain System", 20, pdf.internal.pageSize.height - 10)

      // Save the PDF
      const fileName = `${reportType}-report-${Date.now()}.pdf`
      pdf.save(fileName)

      toast.success("PDF report generated successfully!")
    } catch (error) {
      console.error("Error generating report:", error)
      toast.error("Failed to generate report")
    } finally {
      setGenerating(false)
    }
  }

  const reportTypes = [
    {
      value: "product-journey",
      label: "Product Journey Report",
      description: "Complete tracking history for a specific product",
    },
    {
      value: "compliance",
      label: "Compliance Report",
      description: "Regulatory compliance and audit trail documentation",
    },
    { value: "analytics", label: "Supply Chain Analytics", description: "Performance metrics and analytics dashboard" },
    { value: "inventory", label: "Inventory Report", description: "Current inventory status and location tracking" },
    { value: "quality", label: "Quality Assurance Report", description: "Quality check results and certifications" },
    {
      value: "sustainability",
      label: "Sustainability Report",
      description: "Environmental impact and sustainability metrics",
    },
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
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
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-4 rounded-full shadow-lg">
                <FileDown className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">PDF Reports</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Generate comprehensive PDF reports of supply chain data, analytics, and compliance documentation
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: FileText,
                title: "Professional Reports",
                description: "Generate professional-grade PDF documents",
                color: "text-teal-600",
              },
              {
                icon: BarChart3,
                title: "Data Analytics",
                description: "Include charts, graphs, and analytical insights",
                color: "text-cyan-600",
              },
              {
                icon: Shield,
                title: "Compliance Ready",
                description: "Meet regulatory and audit requirements",
                color: "text-blue-600",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full text-center transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <benefit.icon className={`h-8 w-8 ${benefit.color} mx-auto mb-2`} />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Report Generator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generate Report</CardTitle>
                  <CardDescription>Configure and generate your PDF report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type *</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-teal-500">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productId">Product ID (Optional)</Label>
                    <Input
                      id="productId"
                      placeholder="e.g., PROD001"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Date Range (Optional)</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-teal-500">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 days</SelectItem>
                        <SelectItem value="last-year">Last year</SelectItem>
                        <SelectItem value="all-time">All time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={generateReport}
                      disabled={generating}
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                      {generating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Generate PDF Report
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Report Types Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Available Report Types</CardTitle>
                  <CardDescription>Choose the right report for your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportTypes.map((type, index) => (
                      <motion.div
                        key={type.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className={`p-3 border rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer ${
                          reportType === type.value ? "border-teal-500 bg-teal-50 dark:bg-teal-950" : ""
                        }`}
                        onClick={() => setReportType(type.value)}
                      >
                        <h4 className="font-medium text-sm">{type.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Report Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>Report Features</CardTitle>
                <CardDescription>What's included in your PDF reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Clock,
                      title: "Real-time Data",
                      description: "Latest blockchain data at time of generation",
                    },
                    {
                      icon: Shield,
                      title: "Verified Information",
                      description: "All data verified through blockchain consensus",
                    },
                    {
                      icon: Globe,
                      title: "Global Standards",
                      description: "Compliant with international reporting standards",
                    },
                    {
                      icon: BarChart3,
                      title: "Visual Analytics",
                      description: "Charts and graphs for better understanding",
                    },
                    {
                      icon: FileText,
                      title: "Detailed Documentation",
                      description: "Comprehensive documentation and metadata",
                    },
                    { icon: FileDown, title: "Multiple Formats", description: "Export in various formats and layouts" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <feature.icon className="h-5 w-5 text-teal-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
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
