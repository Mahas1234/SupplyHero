"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"
import { toast } from "react-hot-toast"
import {
  ArrowLeft,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react"

const userRoles = [
  { role: "Producer", color: "green", count: 45 },
  { role: "Distributor", color: "blue", count: 23 },
  { role: "Retailer", color: "purple", count: 67 },
  { role: "Consumer", color: "orange", count: 234 },
]

const mockUsers = [
  {
    id: 1,
    name: "John Martinez",
    email: "john.martinez@greenfarms.com",
    role: "Producer",
    organization: "Green Farms Co.",
    location: "Medellín, Colombia",
    joinDate: "2023-08-15",
    status: "active",
    lastActive: "2024-01-15T10:30:00Z",
    productsRegistered: 23,
    eventsLogged: 156,
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@logistics.com",
    role: "Distributor",
    organization: "Global Logistics Inc.",
    location: "Chicago, USA",
    joinDate: "2023-09-22",
    status: "active",
    lastActive: "2024-01-15T09:45:00Z",
    productsRegistered: 0,
    eventsLogged: 89,
    avatar: null,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@qualitycheck.com",
    role: "Producer",
    organization: "Quality Assurance Ltd.",
    location: "Bogotá, Colombia",
    joinDate: "2023-07-10",
    status: "active",
    lastActive: "2024-01-15T08:20:00Z",
    productsRegistered: 12,
    eventsLogged: 234,
    avatar: null,
  },
  {
    id: 4,
    name: "Mike Wilson",
    email: "mike.wilson@retailmart.com",
    role: "Retailer",
    organization: "RetailMart Chain",
    location: "New York, USA",
    joinDate: "2023-10-05",
    status: "inactive",
    lastActive: "2024-01-10T16:15:00Z",
    productsRegistered: 0,
    eventsLogged: 45,
    avatar: null,
  },
  {
    id: 5,
    name: "Anna Garcia",
    email: "anna.garcia@consumer.com",
    role: "Consumer",
    organization: "Individual",
    location: "Los Angeles, USA",
    joinDate: "2023-11-18",
    status: "active",
    lastActive: "2024-01-15T11:00:00Z",
    productsRegistered: 0,
    eventsLogged: 12,
    avatar: null,
  },
]

export default function UserProfilesPage() {
  const [users, setUsers] = useState(mockUsers)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role) => {
    const roleConfig = userRoles.find((r) => r.role === role)
    return roleConfig ? roleConfig.color : "gray"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatLastActive = (timestamp) => {
    const now = new Date()
    const lastActive = new Date(timestamp)
    const diffInHours = Math.floor((now - lastActive) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
      toast.success("User deleted successfully")
    }
  }

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
    toast.success("User status updated")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-cyan-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              User Profiles
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">User Profile Management</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Manage user profiles, roles, and permissions across your supply chain network with comprehensive user
            administration tools.
          </p>
        </motion.div>

        {/* Role Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {userRoles.map((roleData, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
            >
              <div
                className={`w-12 h-12 bg-${roleData.color}-100 dark:bg-${roleData.color}-900/30 rounded-lg flex items-center justify-center mx-auto mb-4`}
              >
                <Users className={`w-6 h-6 text-${roleData.color}-500`} />
              </div>
              <h3 className="font-semibold mb-1">{roleData.role}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{roleData.count}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">users</p>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="input pl-10"
                />
              </div>

              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="input">
                <option value="all">All Roles</option>
                {userRoles.map((role) => (
                  <option key={role.role} value={role.role}>
                    {role.role}
                  </option>
                ))}
              </select>

              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="input">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button onClick={() => setShowAddForm(true)} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add User
            </button>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold">Users ({filteredUsers.length})</h3>

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold">{user.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-${getRoleColor(
                          user.role,
                        )}-100 dark:bg-${getRoleColor(
                          user.role,
                        )}-900/30 text-${getRoleColor(user.role)}-600 dark:text-${getRoleColor(user.role)}-400`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Building className="w-4 h-4 mr-2" />
                        {user.organization}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {user.location}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        Joined {formatDate(user.joinDate)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Products:</span> {user.productsRegistered}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Events:</span> {user.eventsLogged}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Last Active:</span> {formatLastActive(user.lastActive)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      user.status === "active"
                        ? "text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30"
                        : "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                    }`}
                    title={user.status === "active" ? "Deactivate user" : "Activate user"}
                  >
                    {user.status === "active" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
