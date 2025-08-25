"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { UserProfile } from "@/components/UserProfile"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Search, Users, Shield, Activity, Building } from "lucide-react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import Link from "next/link"

export default function UserProfilesPage() {
  const [searchUserId, setSearchUserId] = useState("")
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  const handleSearchUser = () => {
    if (!searchUserId.trim()) {
      toast.error("Please enter a user ID")
      return
    }

    setSelectedUserId(searchUserId)
    setShowProfile(true)
    toast.success(`Loading profile for user: ${searchUserId}`)
  }

  const mockUsers = [
    {
      id: "user_001",
      name: "John Producer",
      role: "Producer",
      organization: "Colombian Coffee Co.",
      location: "Colombia, South America",
    },
    {
      id: "user_002",
      name: "Sarah Distributor",
      role: "Distributor",
      organization: "Global Logistics Inc.",
      location: "Miami, USA",
    },
    {
      id: "user_003",
      name: "Mike Retailer",
      role: "Retailer",
      organization: "Premium Coffee Shops",
      location: "New York, USA",
    },
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
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
          {!showProfile ? (
            <>
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-br from-violet-600 to-purple-600 p-4 rounded-full shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">User Profiles</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Comprehensive user profiles with activity tracking, role management, and supply chain participation
                </p>
              </motion.div>

              {/* Profile Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  {
                    icon: Shield,
                    title: "Secure Identity",
                    description: "Blockchain-verified user identities and credentials",
                    color: "text-violet-600",
                  },
                  {
                    icon: Activity,
                    title: "Activity Tracking",
                    description: "Complete history of user actions and contributions",
                    color: "text-purple-600",
                  },
                  {
                    icon: Building,
                    title: "Organization Management",
                    description: "Manage organizational roles and permissions",
                    color: "text-pink-600",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full text-center transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <feature.icon className={`h-8 w-8 ${feature.color} mx-auto mb-2`} />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* User Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-md mx-auto mb-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Search User Profile</CardTitle>
                    <CardDescription className="text-center">Enter a user ID to view their profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userId">User ID</Label>
                      <Input
                        id="userId"
                        placeholder="e.g., user_001"
                        value={searchUserId}
                        onChange={(e) => setSearchUserId(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearchUser()}
                        className="transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleSearchUser}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sample Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Sample Users
                    </CardTitle>
                    <CardDescription>Click on any user to view their profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockUsers.map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            setSelectedUserId(user.id)
                            setShowProfile(true)
                          }}
                          className="p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                            <p className="text-xs text-muted-foreground">{user.organization}</p>
                            <p className="text-xs text-muted-foreground mt-1">ID: {user.id}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Profile Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Management Benefits</CardTitle>
                    <CardDescription>Why comprehensive user profiles matter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Identity Verification",
                          description: "Blockchain-verified user identities prevent fraud",
                        },
                        { title: "Role-based Access", description: "Granular permissions based on user roles" },
                        { title: "Activity Monitoring", description: "Track all user actions for compliance" },
                        { title: "Performance Analytics", description: "Analyze user contributions and efficiency" },
                        {
                          title: "Collaboration Tools",
                          description: "Enable secure collaboration between stakeholders",
                        },
                        { title: "Audit Trails", description: "Complete audit trails for regulatory compliance" },
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                          className="p-4 border rounded-lg transition-all duration-300 hover:shadow-md"
                        >
                          <h4 className="font-medium mb-2">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <Button
                  onClick={() => setShowProfile(false)}
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to User Search
                </Button>
              </div>
              <UserProfile userId={selectedUserId} />
            </motion.div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
