"use client"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Download, FileText } from "lucide-react"
import toast from "react-hot-toast"

const PDFExport = ({ data, filename = "supply-chain-report", title = "Supply Chain Report" }) => {
  const exportToPDF = async () => {
    try {
      toast.loading("Generating PDF...", { id: "pdf-export" })

      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Add title
      pdf.setFontSize(20)
      pdf.text(title, pageWidth / 2, 30, { align: "center" })

      // Add date
      pdf.setFontSize(12)
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50)

      let yPosition = 70

      if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
          if (yPosition > pageHeight - 40) {
            pdf.addPage()
            yPosition = 30
          }

          pdf.setFontSize(14)
          pdf.text(`${index + 1}. ${item.name || item.title || "Item"}`, 20, yPosition)
          yPosition += 10

          pdf.setFontSize(10)
          if (item.description) {
            pdf.text(`Description: ${item.description}`, 25, yPosition)
            yPosition += 8
          }

          if (item.status) {
            pdf.text(`Status: ${item.status}`, 25, yPosition)
            yPosition += 8
          }

          if (item.location || item.current_location) {
            pdf.text(`Location: ${item.location || item.current_location}`, 25, yPosition)
            yPosition += 8
          }

          if (item.created_at) {
            const date = new Date(Number(item.created_at) / 1000000).toLocaleDateString()
            pdf.text(`Created: ${date}`, 25, yPosition)
            yPosition += 8
          }

          yPosition += 10
        })
      } else {
        pdf.text("No data available for export", 20, yPosition)
      }

      // Save the PDF
      pdf.save(`${filename}.pdf`)
      toast.success("PDF exported successfully!", { id: "pdf-export" })
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast.error("Failed to export PDF", { id: "pdf-export" })
    }
  }

  const exportElementToPDF = async (elementId) => {
    try {
      toast.loading("Capturing content...", { id: "pdf-export" })

      const element = document.getElementById(elementId)
      if (!element) {
        toast.error("Element not found for export", { id: "pdf-export" })
        return
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${filename}.pdf`)
      toast.success("PDF exported successfully!", { id: "pdf-export" })
    } catch (error) {
      console.error("Error exporting element to PDF:", error)
      toast.error("Failed to export PDF", { id: "pdf-export" })
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
      >
        <FileText size={16} />
        Export PDF
      </button>

      <button
        onClick={() => exportElementToPDF("export-content")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
      >
        <Download size={16} />
        Export View
      </button>
    </div>
  )
}

export default PDFExport
