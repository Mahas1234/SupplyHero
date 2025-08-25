"use client"

import { motion } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { UserRegistration } from "@/components/UserRegistration"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Shield, Network, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "react-hot-toast"
import Link from "next/link"

export default function UserRegistrationPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
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
              <div className="bg-gradient-to-br from-orange-600 to-red-600 p-4 rounded-full shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">User Registration</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join the blockchain supply chain network with role-based access control and secure identity management
            </p>
          </motion.div>

          {/* User Roles Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Different roles available in the supply chain network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      role: "Producer",
                      description: "Create and register new products",
                      permissions: ["Register products", "Add production events", "View own products"],
                      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                    },
                    {
                      role: "Distributor",
                      description: "Manage product distribution",
                      permissions: ["Add shipping events", "Update locations", "View assigned products"],
                      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    },
                    {
                      role: "Retailer",
                      description: "Handle retail operations",
                      permissions: ["Add retail events", "Update inventory", "View retail products"],
                      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                    },
                    {
                      role: "Consumer",
                      description: "Track and verify products",
                      permissions: ["Track products", "View product history", "Verify authenticity"],
                      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                    },
                  ].map((userRole, index) => (
                    <motion.div
                      key={userRole.role}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 border rounded-lg transition-all duration-300 hover:shadow-md"
                    >
                      <Badge className={`${userRole.color} mb-3`}>{userRole.role}</Badge>
                      <p className="text-sm text-muted-foreground mb-3">{userRole.description}</p>
                      <div className="space-y-1">
                        <h5 className="text-xs font-medium text-muted-foreground">Permissions:</h5>
                        {userRole.permissions.map((permission, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {permission}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Registration Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: Shield,
                title: "Secure Identity",
                description: "Blockchain-based identity with cryptographic security",
                color: "text-orange-600",
              },
              {
                icon: Network,
                title: "Network Access",
                description: "Join a global network of supply chain participants",
                color: "text-blue-600",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Participate in supply chains worldwide with ICP",
                color: "text-green-600",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
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

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <UserRegistration />
          </motion.div>

          {/* Registration Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>Registration Process</CardTitle>
                <CardDescription>How user registration works on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Fill Information", description: "Provide your details and select role" },
                    { step: "2", title: "Blockchain Verification", description: "System verifies and validates data" },
                    { step: "3", title: "Identity Creation", description: "Secure blockchain identity is created" },
                    { step: "4", title: "Network Access", description: "Gain access to supply chain network" },
                  ].map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                        {step.step}
                      </div>
                      <h4 className="font-medium mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
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
