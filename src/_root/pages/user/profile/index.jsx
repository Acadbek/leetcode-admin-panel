"use client"

import React, { useState } from "react"
import {
  Activity,
  AlertCircle,
  Calendar,
  Check,
  Clock,
  Code2,
  Eye,
  Lock,
  LogOut,
  Mail,
  Shield,
  User,
  UserX,
  X,
} from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, BarChart } from "@/components/user-profile-chart"
import { useNavigate } from "react-router-dom"
import { useLoading } from "@/context/loading-state"

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("daily")
  const navigate = useNavigate()
  const { run, stop } = useLoading()

  React.useEffect(() => {
    run()
    const timer = setTimeout(() => {
      stop()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Sample data for the charts
  const dailyData = [
    { name: "Mon", value: 5 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 3 },
    { name: "Thu", value: 7 },
    { name: "Fri", value: 9 },
    { name: "Sat", value: 2 },
    { name: "Sun", value: 4 },
  ]

  const weeklyData = [
    { name: "Week 1", value: 25 },
    { name: "Week 2", value: 18 },
    { name: "Week 3", value: 30 },
    { name: "Week 4", value: 22 },
  ]

  const monthlyData = [
    { name: "Jan", value: 80 },
    { name: "Feb", value: 65 },
    { name: "Mar", value: 95 },
    { name: "Apr", value: 70 },
    { name: "May", value: 85 },
    { name: "Jun", value: 60 },
  ]

  // Sample data for problem history
  const problemHistory = [
    { name: "Two Sum", difficulty: "Easy", dateSolved: "2023-10-15", attempts: 1, solutionLink: "#" },
    { name: "Merge Intervals", difficulty: "Medium", dateSolved: "2023-10-12", attempts: 3, solutionLink: "#" },
    { name: "LRU Cache", difficulty: "Hard", dateSolved: "2023-10-08", attempts: 5, solutionLink: "#" },
    { name: "Valid Parentheses", difficulty: "Easy", dateSolved: "2023-10-05", attempts: 1, solutionLink: "#" },
    { name: "Merge K Sorted Lists", difficulty: "Hard", dateSolved: "2023-10-01", attempts: 4, solutionLink: "#" },
  ]

  // Sample data for submissions
  const submissions = [
    {
      problem: "Two Sum",
      language: "JavaScript",
      result: "Accepted",
      submittedAt: "2023-10-15T14:30:00",
      codeLink: "#",
    },
    {
      problem: "Merge Intervals",
      language: "Python",
      result: "Wrong Answer",
      submittedAt: "2023-10-12T10:15:00",
      codeLink: "#",
    },
    {
      problem: "Merge Intervals",
      language: "Python",
      result: "Time Limit",
      submittedAt: "2023-10-12T11:20:00",
      codeLink: "#",
    },
    {
      problem: "Merge Intervals",
      language: "Python",
      result: "Accepted",
      submittedAt: "2023-10-12T13:45:00",
      codeLink: "#",
    },
    {
      problem: "LRU Cache",
      language: "Java",
      result: "Compilation Error",
      submittedAt: "2023-10-08T09:10:00",
      codeLink: "#",
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResultBadge = (result) => {
    switch (result) {
      case "Accepted":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="mr-1 h-3 w-3" /> {result}
          </Badge>
        )
      case "Wrong Answer":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="mr-1 h-3 w-3" /> {result}
          </Badge>
        )
      case "Time Limit":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" /> {result}
          </Badge>
        )
      case "Compilation Error":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <AlertCircle className="mr-1 h-3 w-3" /> {result}
          </Badge>
        )
      default:
        return <Badge>{result}</Badge>
    }
  }


  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-muted-foreground">Detailed information and statistics</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate("/users")} variant="secondary" className="mr-2">
            <LogOut className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" /> Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary">
                  JD
                </div>
                <Badge className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-500">Active</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                {/* <p className="text-sm text-muted-foreground">Full Name</p> */}
                <p className="font-medium text-primary">John Doe</p>
              </div>
              <div>
                {/* <p className="text-sm text-muted-foreground">Username</p> */}
                <p className="font-medium text-gray-400">@johndoe</p>
              </div>
              <div>
                {/* <p className="text-sm text-muted-foreground">Email</p> */}
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">john.doe@example.com</p>
                </div>
              </div>
              <div>
                {/* <p className="text-sm text-muted-foreground">Role</p> */}
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Administrator</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Date</p>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Jan 15, 2023</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="font-medium">Today, 10:30 AM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last IP Address</p>
                <p className="font-medium">192.168.1.1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" /> Statistics
            </CardTitle>
            <CardDescription>User performance and activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Problems</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Submissions</p>
                <p className="text-2xl font-bold">342</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">289</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Wrong Answers</p>
                <p className="text-2xl font-bold">53</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">84.5%</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg. Solution Time</p>
                <p className="text-2xl font-bold">24m</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Activity</h3>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                  <div></div>
                  <TabsList className="grid w-[300px] grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </div>

                <div className="h-[200px]">
                  <TabsContent value="daily" className="h-full mt-0">
                    <AreaChart
                      data={dailyData}
                      index="name"
                      categories={["value"]}
                      colors={["emerald"]}
                      valueFormatter={(value) => `${value}`}
                      className="h-full"
                    />
                  </TabsContent>
                  <TabsContent value="weekly" className="h-full mt-0">
                    <BarChart
                      data={weeklyData}
                      index="name"
                      categories={["value"]}
                      colors={["violet"]}
                      valueFormatter={(value) => `${value}`}
                      className="h-full"
                    />
                  </TabsContent>
                  <TabsContent value="monthly" className="h-full mt-0">
                    <AreaChart
                      data={monthlyData}
                      index="name"
                      categories={["value"]}
                      colors={["cyan"]}
                      valueFormatter={(value) => `${value} `}
                      className="h-full"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Problem History Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code2 className="mr-2 h-5 w-5" /> Problem History
          </CardTitle>
          <CardDescription>List of solved problems</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem Name</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Date Solved</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problemHistory.map((problem, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{problem.name}</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{new Date(problem.dateSolved).toLocaleDateString()}</TableCell>
                  <TableCell>{problem.attempts}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={problem.solutionLink}>
                        <Eye className="mr-2 h-4 w-4" /> View Solution
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>

      {/*  Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code2 className="mr-2 h-5 w-5" /> Submissions
          </CardTitle>
          <CardDescription>Recent code submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{submission.problem}</TableCell>
                  <TableCell>{submission.language}</TableCell>
                  <TableCell>{getResultBadge(submission.result)}</TableCell>
                  <TableCell>{format(new Date(submission.submittedAt), "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={submission.codeLink}>
                        <Eye className="mr-2 h-4 w-4" /> View Code
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>

      {/* Admin Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Admin Actions
          </CardTitle>
          <CardDescription>Manage user account and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <UserX className="mr-2 h-4 w-4" /> Block User
            </Button>
            <Button variant="outline" className="justify-start">
              <Lock className="mr-2 h-4 w-4" /> Reset Password
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="mr-2 h-4 w-4" /> Change Role
            </Button>
            <Button variant="outline" className="justify-start">
              <Mail className="mr-2 h-4 w-4" /> Send Notification
            </Button>
            <Button variant="destructive" className="justify-start">
              <UserX className="mr-2 h-4 w-4" /> Delete Account
            </Button>
            <Button variant="outline" className="justify-start">
              <Eye className="mr-2 h-4 w-4" /> View Login History
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Go to Site Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
