"use client"

import { jsPDF } from "jspdf"
import { toast } from "react-hot-toast"

export function PDFExport({ data, filename, children, className }) {
  const generatePDF = () => {
    try {
      const doc = new jsPDF()

      // Header
      doc.setFontSize(20)
      doc.text("Supply Chain Report", 20, 30)

      // Product Info
      doc.setFontSize(14)
      doc.text(`Product: ${data.productName}`, 20, 50)
      doc.text(`ID: ${data.productId}`, 20, 60)
      doc.text(`Status: ${data.currentStatus}`, 20, 70)
      doc.text(`Location: ${data.currentLocation}`, 20, 80)

      // Timeline
      doc.setFontSize(16)
      doc.text("Timeline:", 20, 100)

      let yPosition = 110
      data.timeline.forEach((event, index) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 30
        }

        doc.setFontSize(12)
        doc.text(`${index + 1}. ${event.status}`, 25, yPosition)
        doc.text(`   Location: ${event.location}`, 25, yPosition + 8)
        doc.text(
          `   Date: ${event.timestamp ? new Date(event.timestamp).toLocaleDateString() : "Pending"}`,
          25,
          yPosition + 16,
        )
        yPosition += 30
      })

      // Save
      doc.save(`${filename}.pdf`)
      toast.success("PDF exported successfully!")
    } catch (error) {
      toast.error("Failed to export PDF")
    }
  }

  return (
    <button onClick={generatePDF} className={className}>
      {children}
    </button>
  )
}
