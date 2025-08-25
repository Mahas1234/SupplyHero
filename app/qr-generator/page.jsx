"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode, Download, Share2, Copy, Smartphone, Globe, Shield } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import Link from "next/link"

export default function QRGeneratorPage() {
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrValue, setQrValue] = useState("")

  const generateQR = () => {
    if (!productId.trim()) {
      toast.error("Please enter a product ID")
      return
    }

    const trackingUrl = `${window.location.origin}/track-product?id=${productId}`
    setQrValue(trackingUrl)
    setQrGenerated(true)
    toast.success("QR Code generated successfully!")
  }

  const downloadQR = () => {
    const svg = document.getElementById("generated-qr-code")
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `${productId}-qr-code.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
    toast.success("QR Code downloaded!")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(qrValue)
    toast.success("Link copied to clipboard!")
  }

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Track ${productName || productId}`,
          text: `Track this product in the supply chain`,
          url: qrValue,
        })
      } catch (err) {
        copyLink()
      }
    } else {
      copyLink()
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
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
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-full shadow-lg">
                <QrCode className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">QR Code Generator</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Generate QR codes for products to enable quick tracking and verification by consumers and stakeholders
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
                icon: Smartphone,
                title: "Mobile Friendly",
                description: "Easy scanning with any smartphone camera",
                color: "text-indigo-600",
              },
              {
                icon: Globe,
                title: "Universal Access",
                description: "Works globally without special apps",
                color: "text-purple-600",
              },
              {
                icon: Shield,
                title: "Secure Tracking",
                description: "Direct link to blockchain verification",
                color: "text-pink-600",
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

          {/* QR Generator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generate QR Code</CardTitle>
                  <CardDescription>Enter product details to create a QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Product ID *</Label>
                    <Input
                      id="productId"
                      placeholder="e.g., PROD001"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name (Optional)</Label>
                    <Input
                      id="productName"
                      placeholder="e.g., Organic Coffee Beans"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={generateQR}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* QR Code Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                  <CardDescription>
                    {qrGenerated ? "Scan or share this QR code" : "QR code will appear here"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {qrGenerated ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-center p-6 bg-white rounded-lg shadow-inner">
                        <QRCodeSVG id="generated-qr-code" value={qrValue} size={200} level="M" includeMargin={true} />
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Product ID: {productId}</p>
                        {productName && <p className="text-sm text-muted-foreground mb-4">{productName}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={downloadQR} variant="outline" size="sm" className="w-full bg-transparent">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={shareQR} variant="outline" size="sm" className="w-full bg-transparent">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={copyLink} variant="outline" size="sm" className="w-full bg-transparent">
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="text-center">
                        <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-muted-foreground">Enter product details to generate QR code</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>QR Code Use Cases</CardTitle>
                <CardDescription>How QR codes enhance supply chain transparency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Product Packaging",
                      description: "Print QR codes on product packaging for consumer verification",
                    },
                    { title: "Shipping Labels", description: "Add to shipping labels for logistics tracking" },
                    { title: "Retail Displays", description: "Display in stores for customer product information" },
                    { title: "Marketing Materials", description: "Include in brochures and advertisements" },
                    {
                      title: "Compliance Documentation",
                      description: "Attach to compliance and certification documents",
                    },
                    { title: "Digital Catalogs", description: "Embed in digital product catalogs and websites" },
                  ].map((useCase, index) => (
                    <motion.div
                      key={useCase.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      className="p-4 border rounded-lg transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-medium mb-2">{useCase.title}</h4>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
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
