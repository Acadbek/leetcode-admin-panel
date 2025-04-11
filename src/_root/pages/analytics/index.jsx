"use client"

import { useState } from "react"
import {
  BarChart,
  BookOpen,
  ChevronDown,
  Clock,
  Code,
  FileCode,
  Filter,
  LayoutDashboard,
  LineChartIcon,
  Newspaper,
  PieChartIcon,
  Trophy,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <LayoutDashboard className="h-6 w-6" />
        <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>{getDateRangeText(dateRange)}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("7d")}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("30d")}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("90d")}>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("year")}>This year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="grid gap-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Global Statistics</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Users"
                value="125,430"
                description="+12.3% from last month"
                icon={<Users className="h-5 w-5 text-blue-500" />}
              />
              <StatCard
                title="Active Users (24h)"
                value="24,738"
                description="+5.2% from yesterday"
                icon={<Users className="h-5 w-5 text-green-500" />}
              />
              <StatCard
                title="Total Problems"
                value="2,345"
                description="+15 new this week"
                icon={<FileCode className="h-5 w-5 text-purple-500" />}
              />
              <StatCard
                title="Total Submissions"
                value="5.2M"
                description="+124K this week"
                icon={<Code className="h-5 w-5 text-orange-500" />}
              />
              <StatCard
                title="Total Contests"
                value="342"
                description="+2 this month"
                icon={<Trophy className="h-5 w-5 text-yellow-500" />}
              />
              <StatCard
                title="Blog Posts"
                value="1,245"
                description="+18 this month"
                icon={<BookOpen className="h-5 w-5 text-pink-500" />}
              />
              <StatCard
                title="News Articles"
                value="856"
                description="+12 this month"
                icon={<Newspaper className="h-5 w-5 text-cyan-500" />}
              />
              <StatCard
                title="New Users Today"
                value="342"
                description="+28% from yesterday"
                icon={<Users className="h-5 w-5 text-indigo-500" />}
              />
            </div>
          </section>

          <Tabs defaultValue="users" className="mt-6">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="problems" className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span className="hidden sm:inline">Problems</span>
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Submissions</span>
              </TabsTrigger>
              <TabsTrigger value="contests" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Contests</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Daily Active Users</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </div>
                    <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Daily active users over time</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Weekly Registered Users</CardTitle>
                      <CardDescription>Last 12 weeks</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Weekly registered users</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>User Distribution by Role</CardTitle>
                      <CardDescription>Current distribution</CardDescription>
                    </div>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: User roles distribution</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>User Status Breakdown</CardTitle>
                      <CardDescription>Current status</CardDescription>
                    </div>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: User status breakdown</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problems" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Most Solved Problems</CardTitle>
                      <CardDescription>Top 10 problems by solve count</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Most solved problems</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Most Attempted Problems</CardTitle>
                      <CardDescription>Top 10 problems by attempt count</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Most attempted problems</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Difficulty Distribution</CardTitle>
                      <CardDescription>Problems by difficulty level</CardDescription>
                    </div>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Problem difficulty distribution</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Average Solution Time</CardTitle>
                      <CardDescription>By difficulty level (minutes)</CardDescription>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Average solution time</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Total Submissions Over Time</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </div>
                    <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Submissions over time</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Submission Results</CardTitle>
                      <CardDescription>Accepted vs Wrong Answers vs Other</CardDescription>
                    </div>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Submission results breakdown</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Most Popular Languages</CardTitle>
                      <CardDescription>Top programming languages</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Popular programming languages</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Average Attempts per User</CardTitle>
                      <CardDescription>By difficulty level</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Average attempts per user</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contests" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Contests per Month</CardTitle>
                      <CardDescription>Last 12 months</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Contests per month</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Average Participants</CardTitle>
                      <CardDescription>Per contest type</CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">Chart: Average participants</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Upcoming Contests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contest Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingContests.map((contest) => (
                          <TableRow key={contest.id}>
                            <TableCell className="font-medium">{contest.name}</TableCell>
                            <TableCell>{contest.date}</TableCell>
                            <TableCell>{contest.duration}</TableCell>
                            <TableCell>{contest.registered}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Activity Heatmap</h2>
            <Card>
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Daily activity over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="grid grid-cols-53 gap-1">
                  {generateHeatmapData().map((day, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor: getHeatmapColor(day.value),
                        cursor: "pointer",
                      }}
                      title={`${format(day.date, "MMM d, yyyy")}: ${day.value} activities`}
                    />
                  ))}
                </div> */}
                <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-emerald-100" />
                    <span>Less</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-emerald-300" />
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-emerald-500" />
                    <span>More</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-emerald-700" />
                    <span>Most</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Latest Activity</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                        <TableCell className="font-medium">{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <CardDescription className="text-2xl font-bold text-foreground">{value}</CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Helper functions
function getDateRangeText(range) {
  switch (range) {
    case "7d":
      return "Last 7 days"
    case "30d":
      return "Last 30 days"
    case "90d":
      return "Last 90 days"
    case "year":
      return "This year"
    default:
      return "Last 30 days"
  }
}

// Sample data
const upcomingContests = [
  { id: 1, name: "Weekly Contest 345", date: "May 4, 2024", duration: "1.5 hours", registered: "3,245" },
  { id: 2, name: "Biweekly Contest 126", date: "May 11, 2024", duration: "2 hours", registered: "2,876" },
  { id: 3, name: "Monthly Challenge", date: "May 18, 2024", duration: "3 hours", registered: "4,532" },
  { id: 4, name: "Special Contest: AI & Algorithms", date: "May 25, 2024", duration: "4 hours", registered: "5,678" },
]

const latestActivities = [
  { id: 1, time: "2 minutes ago", user: "johndoe", action: "Registered", details: "New user registration" },
  { id: 2, time: "5 minutes ago", user: "alice123", action: "Solved Problem", details: "Two Sum (Easy)" },
  { id: 3, time: "12 minutes ago", user: "bob456", action: "Submitted Solution", details: "Valid Parentheses (Easy)" },
  { id: 4, time: "15 minutes ago", user: "admin", action: "Created Contest", details: "Weekly Contest 345" },
  {
    id: 5,
    time: "20 minutes ago",
    user: "moderator",
    action: "Published Blog",
    details: "Top 10 Dynamic Programming Patterns",
  },
  {
    id: 6,
    time: "25 minutes ago",
    user: "charlie789",
    action: "Registered for Contest",
    details: "Biweekly Contest 126",
  },
  { id: 7, time: "30 minutes ago", user: "admin", action: "Reset Password", details: "For user: david012" },
  { id: 8, time: "35 minutes ago", user: "eve345", action: "Commented", details: "On blog: Advanced Graph Algorithms" },
]
