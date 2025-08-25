import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext.jsx"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import RegisterProductPage from "./pages/RegisterProductPage.jsx"
import TrackProductPage from "./pages/TrackProductPage.jsx"
import SupplyEventsPage from "./pages/SupplyEventsPage.jsx"
import UserRegistrationPage from "./pages/UserRegistrationPage.jsx"
import QRGeneratorPage from "./pages/QRGeneratorPage.jsx"
import PDFReportsPage from "./pages/PDFReportsPage.jsx"
import SearchAnalyticsPage from "./pages/SearchAnalyticsPage.jsx"
import UserProfilesPage from "./pages/UserProfilesPage.jsx"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/register-product" element={<RegisterProductPage />} />
            <Route path="/track-product" element={<TrackProductPage />} />
            <Route path="/supply-events" element={<SupplyEventsPage />} />
            <Route path="/user-registration" element={<UserRegistrationPage />} />
            <Route path="/qr-generator" element={<QRGeneratorPage />} />
            <Route path="/pdf-reports" element={<PDFReportsPage />} />
            <Route path="/search-analytics" element={<SearchAnalyticsPage />} />
            <Route path="/user-profiles" element={<UserProfilesPage />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
