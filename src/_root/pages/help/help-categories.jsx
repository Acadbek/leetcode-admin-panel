"use client"

import { useState } from "react"
import { Users, Trophy, FileCode, Settings, Shield, BarChart, AlertTriangle, Database, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function CategoryCard({ icon, title, description }) {
  return (
    <DialogTrigger asChild>
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">{icon}</div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </DialogTrigger>
  )
}

export function HelpCategories() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleCategoryClick = (title) => {
    setSelectedCategory(title)
    setOpen(true)
  }

  const categories = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "User Management",
      description: "Manage users, roles, permissions, and account actions",
    },
    {
      icon: <Trophy className="h-6 w-6 text-amber-600" />,
      title: "Contest Management",
      description: "Create, edit, and manage coding contests and leaderboards",
    },
    {
      icon: <FileCode className="h-6 w-6 text-emerald-600" />,
      title: "Problem Management",
      description: "Create, edit, and organize coding problems and test cases",
    },
    {
      icon: <Settings className="h-6 w-6 text-gray-600" />,
      title: "Site Settings",
      description: "Configure platform settings, appearance, and behavior",
    },
    {
      icon: <Shield className="h-6 w-6 text-red-600" />,
      title: "Submissions & Moderation",
      description: "Review submissions, handle reports, and moderate content",
    },
    {
      icon: <Server className="h-6 w-6 text-purple-600" />,
      title: "System Logs & Security",
      description: "Monitor system logs, security alerts, and platform health",
    },
    {
      icon: <BarChart className="h-6 w-6 text-indigo-600" />,
      title: "Analytics & Reports",
      description: "View platform analytics, usage statistics, and generate reports",
    },
    {
      icon: <Database className="h-6 w-6 text-cyan-600" />,
      title: "Data Management",
      description: "Manage backups, exports, and data integrity",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
      title: "Alerts & Notifications",
      description: "Configure system alerts and user notifications",
    },
  ]

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Help Categories</h2>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} onClick={() => handleCategoryClick(category.title)}>
              <CategoryCard icon={category.icon} title={category.title} description={category.description} />
            </div>
          ))}
        </div>

        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCategory}</DialogTitle>
            <DialogDescription>Help topics and guides for {selectedCategory.toLowerCase()}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">Select a topic below to view detailed instructions:</p>
            <ul className="space-y-2">
              {selectedCategory === "User Management" && (
                <>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    How to add a new admin or moderator
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Managing user roles and permissions
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Handling user account disputes
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    User verification and approval process
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">Bulk user operations</li>
                </>
              )}
              {selectedCategory === "Contest Management" && (
                <>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Creating a new contest
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Setting up contest rules and scoring
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Managing contest registrations
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Monitoring live contests
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Handling contest disputes
                  </li>
                </>
              )}
              {selectedCategory !== "User Management" && selectedCategory !== "Contest Management" && (
                <>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Getting started with {selectedCategory.toLowerCase()}
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Common tasks and operations
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Advanced features and settings
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Troubleshooting and FAQs
                  </li>
                  <li className="p-3 bg-secondary rounded-md cursor-pointer">
                    Best practices and recommendations
                  </li>
                </>
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
