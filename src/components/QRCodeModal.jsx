"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { X, Download, Share, Copy, Check } from "lucide-react"
import { toast } from "react-hot-toast"

export function QRCodeModal({ isOpen, onClose, productId, productName }) {
  const [copied, setCopied] = useState(false)

  const qrValue = `${window.location.origin}/track-product?id=${productId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrValue)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById("qr-code")
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const link = document.createElement("a")
      link.download = `qr-${productId}.png`
      link.href = canvas.toDataURL()
      link.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
    toast.success("QR code downloaded!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Track ${productName}`,
          text: `Track this product: ${productName}`,
          url: qrValue,
        })
      } catch (error) {
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">QR Code</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <QRCodeSVG id="qr-code" value={qrValue} size={200} level="M" includeMargin={true} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Scan to track: {productName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {productId}</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>

              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>

              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
