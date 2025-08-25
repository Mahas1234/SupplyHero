"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, QrCode, Download, Copy } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import QRCodeModal from "../components/QRCodeModal"
import { QRCodeSVG } from "qrcode.react"
import toast from "react-hot-toast"

const QRGeneratorPage = () => {
  const [qrData, setQrData] = useState("")
  const [qrSize, setQrSize] = useState(256)
  const [qrLevel, setQrLevel] = useState("M")
  const [showModal, setShowModal] = useState(false)
  const [presetType, setPresetType] = useState("custom")

  const presets = {
    product: {
      label: "Product Tracking",
      template: "https://supply-chain.icp/track/PRD123456",
      description: "Generate QR code for product tracking",
    },
    location: {
      label: "Location Check-in",
      template: "https://supply-chain.icp/location/warehouse-miami",
      description: "Generate QR code for location check-in",
    },
    event: {
      label: "Event Registration",
      template: "https://supply-chain.icp/event/EVT789012",
      description: "Generate QR code for event registration",
    },
    user: {
      label: "User Profile",
      template: "https://supply-chain.icp/user/USR345678",
      description: "Generate QR code for user profile",
    },
  }

  const handlePresetChange = (type) => {
    setPresetType(type)
    if (type !== "custom" && presets[type]) {
      setQrData(presets[type].template)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrData)
    toast.success("QR data copied to clipboard!")
  }

  const downloadQR = () => {
    const svg = document.getElementById("preview-qr-code")
    if (!svg) return

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
      downloadLink.download = `QR_Code_${Date.now()}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <QrCode className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Code Generator</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Generate QR Code</h2>
              <p className="text-gray-600 dark:text-gray-300">Create QR codes for products, locations, and events</p>
            </div>

            <div className="space-y-6">
              {/* Preset Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePresetChange("custom")}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      presetType === "custom"
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">Custom</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Enter custom data</div>
                  </button>

                  {Object.entries(presets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => handlePresetChange(key)}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        presetType === key
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{preset.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Data Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">QR Code Data</label>
                <div className="relative">
                  <textarea
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    rows={4}
                    className="input-field pr-10"
                    placeholder="Enter text, URL, or data to encode..."
                  />
                  {qrData && (
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* QR Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size (px)</label>
                  <select value={qrSize} onChange={(e) => setQrSize(Number(e.target.value))} className="input-field">
                    <option value={128}>128x128</option>
                    <option value={256}>256x256</option>
                    <option value={512}>512x512</option>
                    <option value={1024}>1024x1024</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Correction
                  </label>
                  <select value={qrLevel} onChange={(e) => setQrLevel(e.target.value)} className="input-field">
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  disabled={!qrData}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  View Full Size
                </button>

                <button
                  onClick={downloadQR}
                  disabled={!qrData}
                  className="flex items-center px-4 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Preview</h3>
              <p className="text-gray-600 dark:text-gray-300">Live preview of your QR code</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              {qrData ? (
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <QRCodeSVG
                    id="preview-qr-code"
                    value={qrData}
                    size={Math.min(qrSize, 300)}
                    level={qrLevel}
                    includeMargin={true}
                  />
                </div>
              ) : (
                <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Enter data to generate QR code</p>
                  </div>
                </div>
              )}

              {qrData && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Size: {qrSize}x{qrSize}px
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Error Correction: {qrLevel}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <QRCodeModal isOpen={showModal} onClose={() => setShowModal(false)} data={qrData} title="Generated QR Code" />
    </div>
  )
}

export default QRGeneratorPage
