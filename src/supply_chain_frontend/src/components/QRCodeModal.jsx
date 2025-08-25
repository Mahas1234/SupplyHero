"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X, Download } from "lucide-react"

const QRCodeModal = ({ isOpen, onClose, data, title = "QR Code" }) => {
  const [downloadFormat, setDownloadFormat] = useState("svg")

  if (!isOpen) return null

  const downloadQR = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const svg = document.querySelector("#qr-code-svg")

    if (downloadFormat === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement("a")
      downloadLink.href = svgUrl
      downloadLink.download = `${title.replace(/\s+/g, "_")}_QR.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(svgUrl)
    } else {
      // PNG download logic would go here
      console.log("PNG download not implemented yet")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <QRCodeSVG
            id="qr-code-svg"
            value={data}
            size={200}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
          </select>

          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal
