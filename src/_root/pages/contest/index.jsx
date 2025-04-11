"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Trophy, Users, ArrowRight, CheckCircle, XCircle, LockIcon as LockClosed, Star, Zap, Award, BarChart4, Code, Flame, Target, Filter } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useLoading } from "@/context/loading-state"

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [countdowns, setCountdowns] = useState({})
  const [filterType, setFilterType] = useState("all")

  const { run, stop } = useLoading();

  React.useEffect(() => {
    run()
    const timer = setTimeout(() => {
      stop()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for contests
  const upcomingContests = [
    {
      id: "weekly-123",
      name: "Weekly Contest 123",
      type: "Weekly",
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: "1.5 hours",
      registrationStatus: "Open",
      registeredParticipants: 3245,
      hasPrize: true,
      difficulty: "Medium",
      description: "Solve algorithm problems and compete with coders worldwide in our weekly challenge.",
      sponsor: null,
      problemCount: 4,
    },
    {
      id: "biweekly-45",
      name: "Biweekly Contest 45",
      type: "Biweekly",
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: "2 hours",
      registrationStatus: "Open",
      registeredParticipants: 2156,
      hasPrize: false,
      difficulty: "Medium",
      description: "A biweekly coding challenge with a mix of algorithm and data structure problems.",
      sponsor: null,
      problemCount: 4,
    },
    {
      id: "google-2023",
      name: "Google Coding Challenge 2023",
      type: "Company",
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      duration: "3 hours",
      registrationStatus: "Open",
      registeredParticipants: 5678,
      hasPrize: true,
      difficulty: "Hard",
      description: "Sponsored by Google. Solve challenging problems and get a chance to win exciting prizes!",
      sponsor: {
        name: "Google",
        logo: "https://www.google.com/favicon.ico",
      },
      problemCount: 5,
    },
    {
      id: "monthly-apr",
      name: "Monthly Contest - April",
      type: "Monthly",
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      duration: "2.5 hours",
      registrationStatus: "Closed",
      registeredParticipants: 1234,
      hasPrize: true,
      difficulty: "Hard",
      description: "Our monthly flagship contest with challenging problems and valuable prizes.",
      sponsor: null,
      problemCount: 6,
    },
    {
      id: "amazon-2023",
      name: "Amazon Coding Championship",
      type: "Company",
      startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      duration: "3 hours",
      registrationStatus: "Open",
      registeredParticipants: 4321,
      hasPrize: true,
      difficulty: "Medium",
      description: "Sponsored by Amazon. Showcase your skills and get noticed by Amazon recruiters!",
      sponsor: {
        name: "Amazon",
        logo: "https://www.amazon.com/favicon.ico",
      },
      problemCount: 5,
    },
    {
      id: "beginner-friendly",
      name: "Beginner Friendly Contest",
      type: "Special",
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: "1.5 hours",
      registrationStatus: "Open",
      registeredParticipants: 1876,
      hasPrize: false,
      difficulty: "Easy",
      description: "Perfect for newcomers! Simple problems to help you get started with competitive programming.",
      sponsor: null,
      problemCount: 3,
    },
  ]

  const activeContest = {
    id: "active-contest",
    name: "Weekly Contest 122",
    type: "Weekly",
    startTime: new Date(Date.now() - 45 * 60 * 1000), // Started 45 minutes ago
    endTime: new Date(Date.now() + 45 * 60 * 1000), // Ends in 45 minutes
    duration: "1.5 hours",
    registeredParticipants: 4532,
    totalProblems: 4,
    difficulty: "Medium",
    problemStatus: [
      { id: "p1", name: "Two Sum", difficulty: "Easy", status: "solved" },
      { id: "p2", name: "Valid Parentheses", difficulty: "Easy", status: "unsolved" },
      { id: "p3", name: "Merge Intervals", difficulty: "Medium", status: "unsolved" },
      { id: "p4", name: "LRU Cache", difficulty: "Hard", status: "locked" },
    ],
    leaderboard: [
      { rank: 1, username: "codingmaster", avatar: "/placeholder.svg?height=32&width=32", score: 300, solvedCount: 3 },
      { rank: 2, username: "algoguru", avatar: "/placeholder.svg?height=32&width=32", score: 275, solvedCount: 3 },
      { rank: 3, username: "devninja", avatar: "/placeholder.svg?height=32&width=32", score: 250, solvedCount: 2 },
      { rank: 4, username: "bytecoder", avatar: "/placeholder.svg?height=32&width=32", score: 225, solvedCount: 2 },
      { rank: 5, username: "hackerpro", avatar: "/placeholder.svg?height=32&width=32", score: 200, solvedCount: 2 },
      { rank: 6, username: "codewarrior", avatar: "/placeholder.svg?height=32&width=32", score: 175, solvedCount: 2 },
      { rank: 7, username: "pythonista", avatar: "/placeholder.svg?height=32&width=32", score: 150, solvedCount: 1 },
      { rank: 8, username: "javascripter", avatar: "/placeholder.svg?height=32&width=32", score: 125, solvedCount: 1 },
      { rank: 9, username: "rustlover", avatar: "/placeholder.svg?height=32&width=32", score: 100, solvedCount: 1 },
      { rank: 10, username: "golangdev", avatar: "/placeholder.svg?height=32&width=32", score: 75, solvedCount: 1 },
    ],
    myProgress: {
      rank: 42,
      score: 150,
      solvedCount: 1,
    },
  }

  const pastContests = [
    {
      id: "weekly-121",
      name: "Weekly Contest 121",
      type: "Weekly",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      participants: 4532,
      winner: "codingmaster",
      winnerAvatar: "/placeholder.svg?height=32&width=32",
      myRank: 245,
      participated: true,
      problemCount: 4,
      difficulty: "Medium",
    },
    {
      id: "biweekly-44",
      name: "Biweekly Contest 44",
      type: "Biweekly",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      participants: 3245,
      winner: "algoguru",
      winnerAvatar: "",
      myRank: null,
      participated: false,
      problemCount: 4,
      difficulty: "Medium",
    },
    {
      id: "amazon-2023-past",
      name: "Amazon Coding Challenge 2023",
      type: "Company",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
      participants: 6789,
      winner: "devninja",
      winnerAvatar: "",
      myRank: 123,
      participated: true,
      problemCount: 5,
      difficulty: "Hard",
      sponsor: {
        name: "Amazon",
        logo: "/placeholder.svg?height=40&width=120",
      },
    },
    {
      id: "monthly-mar",
      name: "Monthly Contest - March",
      type: "Monthly",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      participants: 5432,
      winner: "bytecoder",
      winnerAvatar: "/placeholder.svg?height=32&width=32",
      myRank: 456,
      participated: true,
      problemCount: 6,
      difficulty: "Hard",
    },
    {
      id: "microsoft-2023",
      name: "Microsoft Coding Cup",
      type: "Company",
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      participants: 5987,
      winner: "hackerpro",
      winnerAvatar: "/placeholder.svg?height=32&width=32",
      myRank: null,
      participated: false,
      problemCount: 5,
      difficulty: "Medium",
      sponsor: {
        name: "Microsoft",
        logo: "/placeholder.svg?height=40&width=120",
      },
    },
    {
      id: "weekly-120",
      name: "Weekly Contest 120",
      type: "Weekly",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      participants: 4123,
      winner: "codewarrior",
      winnerAvatar: "/placeholder.svg?height=32&width=32",
      myRank: 78,
      participated: true,
      problemCount: 4,
      difficulty: "Medium",
    },
  ]

  // Update countdowns every second
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date()
      const newCountdowns = {}

      upcomingContests.forEach((contest) => {
        const diff = contest.startDate.getTime() - now.getTime()
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

          if (days > 0) {
            newCountdowns[contest.id] = `${days}d ${hours}h ${minutes}m`
          } else if (hours > 0) {
            newCountdowns[contest.id] = `${hours}h ${minutes}m`
          } else {
            newCountdowns[contest.id] = `${minutes}m`
          }
        } else {
          newCountdowns[contest.id] = "Starting soon"
        }
      })

      if (activeContest) {
        const diff = activeContest.endTime.getTime() - now.getTime()
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          newCountdowns["active"] =
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        } else {
          newCountdowns["active"] = "Ended"
        }
      }

      setCountdowns(newCountdowns)
    }

    updateCountdowns()
    const interval = setInterval(updateCountdowns, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500"
      case "Medium":
        return "text-amber-500"
      case "Hard":
        return "text-red-500"
      default:
        return ""
    }
  }

  const getDifficultyBadgeVariant = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "outline"
      case "Medium":
        return "secondary"
      case "Hard":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredUpcomingContests = filterType === "all"
    ? upcomingContests
    : upcomingContests.filter(contest => contest.type.toLowerCase() === filterType.toLowerCase())

  const filteredPastContests = filterType === "all"
    ? pastContests
    : pastContests.filter(contest => contest.type.toLowerCase() === filterType.toLowerCase())

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Coding Contests</h1>
            <p className="text-muted-foreground max-w-2xl">
              Participate in coding competitions, solve algorithmic challenges, and climb the global leaderboard.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Active contest section */}
        {activeContest && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Flame className="h-6 w-6 mr-2 text-red-500" /> Active Contest
              </h2>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span className="text-lg font-mono font-bold text-primary">{countdowns["active"] || "00:00:00"}</span>
              </div>
            </div>

            <Card className="overflow-hidden border border-primary/20">
              <div className="bg-primary/5 px-6 py-4 border-b border-border/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Link to={`/contests/${activeContest.id}`} className="hover:underline">
                      <h3 className="text-xl font-bold">{activeContest.name}</h3>
                    </Link>
                    <div className="flex items-center flex-wrap gap-2 mt-1">
                      <Badge variant="outline">{activeContest.type}</Badge>
                      <Badge variant={getDifficultyBadgeVariant(activeContest.difficulty)}>
                        {activeContest.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {activeContest.registeredParticipants.toLocaleString()} participants
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/contests/${activeContest.id}`}>Enter Contest</Link>
                    </Button>
                    <Button variant="outline">View Problems</Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Problems section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">Problems</h4>
                      <span className="text-sm text-muted-foreground">
                        {activeContest.problemStatus.filter(p => p.status === "solved").length}/{activeContest.totalProblems} solved
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeContest.problemStatus.map((problem, index) => (
                        <div
                          key={problem.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-md",
                            problem.status === "solved" ? "bg-green-500/10" : "bg-muted/50"
                          )}
                        >
                          <div className="flex items-center">
                            {problem.status === "solved" ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : problem.status === "unsolved" ? (
                              <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                            ) : (
                              <LockClosed className="h-5 w-5 text-amber-500 mr-2" />
                            )}
                            <div>
                              <span className="font-medium">
                                {String.fromCharCode(65 + index)}. {problem.name}
                              </span>
                              <span className={cn("ml-2 text-xs", getDifficultyColor(problem.difficulty))}>
                                {problem.difficulty}
                              </span>
                            </div>
                          </div>
                          <Link to={`/contests/${activeContest.id}/problem/${problem.id}`}>
                            <Button variant="ghost" size="sm">
                              {problem.status === "locked" ? "Locked" : "Solve"}
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {activeContest.myProgress.solvedCount}/{activeContest.totalProblems}
                        </span>
                      </div>
                      <Progress
                        value={(activeContest.myProgress.solvedCount / activeContest.totalProblems) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{activeContest.myProgress.rank}</div>
                          <div className="text-xs text-muted-foreground">Current Rank</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{activeContest.myProgress.score}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{activeContest.myProgress.solvedCount}</div>
                          <div className="text-xs text-muted-foreground">Solved</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">Live Leaderboard</h4>
                      <Link to={`/contests/${activeContest.id}/leaderboard`} className="text-sm text-primary hover:underline">
                        View Full Leaderboard
                      </Link>
                    </div>

                    <div className="space-y-2">
                      {activeContest.leaderboard.slice(0, 5).map((user) => (
                        <div
                          key={user.username}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-md",
                            user.rank <= 3 ? "bg-amber-500/10" : "bg-muted/50"
                          )}
                        >
                          <div className="flex items-center">
                            <div className="w-8 text-center font-medium">
                              {user.rank <= 3 ? (
                                <Award
                                  className={cn(
                                    "h-5 w-5 mx-auto",
                                    user.rank === 1 ? "text-yellow-500" :
                                      user.rank === 2 ? "text-gray-400" : "text-amber-700"
                                  )}
                                />
                              ) : (
                                user.rank
                              )}
                            </div>
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={user.avatar} alt={user.username} />
                              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.username}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-medium">{user.score}</div>
                              <div className="text-xs text-muted-foreground">points</div>
                            </div>
                            <div className="text-right min-w-[40px]">
                              <div className="font-medium">{user.solvedCount}/{activeContest.totalProblems}</div>
                              <div className="text-xs text-muted-foreground">solved</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      {activeContest.leaderboard.length > 5 && (
                        <div className="flex justify-center my-2">
                          <div className="text-muted-foreground text-sm">• • •</div>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-3 rounded-md bg-primary/5 border border-primary/20">
                        <div className="flex items-center">
                          <div className="w-8 text-center font-medium">{activeContest.myProgress.rank}</div>
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                            <AvatarFallback>Y</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">You</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">{activeContest.myProgress.score}</div>
                            <div className="text-xs text-muted-foreground">points</div>
                          </div>
                          <div className="text-right min-w-[40px]">
                            <div className="font-medium">{activeContest.myProgress.solvedCount}/{activeContest.totalProblems}</div>
                            <div className="text-xs text-muted-foreground">solved</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contest tabs */}
        <div className="mb-6">
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="upcoming" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" /> Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1">
                  <Clock className="h-4 w-4 mr-2" /> Past
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="all">All Types</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="company">Company</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>

            <TabsContent value="upcoming" className="space-y-6 mt-0">
              {filteredUpcomingContests.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No contests match your filter</h3>
                  <p className="text-muted-foreground">Try changing your filter or check back later</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcomingContests.map((contest) => (
                    <Card key={contest.id} className="overflow-hidden flex flex-col h-full">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              <Link to={`/contests/${contest.id}`} className="hover:text-primary transition-colors">
                                {contest.name}
                              </Link>
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline">{contest.type}</Badge>
                              <Badge variant={getDifficultyBadgeVariant(contest.difficulty)}>
                                {contest.difficulty}
                              </Badge>
                              {contest.hasPrize && (
                                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">
                                  <Trophy className="h-3 w-3 mr-1" /> Prize
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant={
                              contest.registrationStatus === "Open"
                                ? "default"
                                : contest.registrationStatus === "Registered"
                                  ? "success"
                                  : "outline"
                            }
                          >
                            {contest.registrationStatus}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-sm text-muted-foreground mb-4">{contest.description}</p>

                        {contest.sponsor && (
                          <div className="flex items-center mb-4 p-2 bg-muted/50 rounded-md">
                            <span className="text-xs text-muted-foreground mr-2">Sponsored by</span>
                            <img
                              src={contest.sponsor.logo || "/placeholder.svg"}
                              alt={contest.sponsor.name}
                              width={80}
                              height={30}
                              className="h-6 object-contain"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{formatDate(contest.startDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Duration: {contest.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center mt-4">
                          <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{contest.problemCount} problems</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">Starts in: {countdowns[contest.id] || "Loading..."}</span>
                        </div>
                        <div>
                          {contest.registrationStatus === "Open" ? (
                            <Button size="sm">Register</Button>
                          ) : contest.registrationStatus === "Registered" ? (
                            <Button size="sm" variant="outline">
                              Unregister
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Registration Closed
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6 mt-0">
              {filteredPastContests.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No contests match your filter</h3>
                  <p className="text-muted-foreground">Try changing your filter or check back later</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPastContests.map((contest) => (
                    <Card key={contest.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              <Link to={`/contests/${contest.id}`} className="hover:text-primary transition-colors">
                                {contest.name}
                              </Link>
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline">{contest.type}</Badge>
                              <Badge variant={getDifficultyBadgeVariant(contest.difficulty)}>
                                {contest.difficulty}
                              </Badge>
                            </div>
                          </div>
                          {contest.participated && <Badge variant="secondary">Participated</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{formatDate(contest.date)}</span>
                        </div>

                        {contest.sponsor && (
                          <div className="flex items-center mb-4 p-2 bg-muted/50 rounded-md">
                            <span className="text-xs text-muted-foreground mr-2">Sponsored by</span>
                            <img
                              src={contest.sponsor.logo || "/placeholder.svg"}
                              alt={contest.sponsor.name}
                              width={80}
                              height={30}
                              className="h-6 object-contain"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={contest.winnerAvatar} alt={contest.winner} />
                                <AvatarFallback>{contest.winner[0].toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{contest.winner}</span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">Winner</span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{contest.participants.toLocaleString()} participants</span>
                          </div>
                          <div className="flex items-center">
                            <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{contest.problemCount} problems</span>
                          </div>
                        </div>

                        {contest.participated && contest.myRank && (
                          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Your Rank</span>
                              <span className="font-bold">{contest.myRank}</span>
                            </div>
                            <Progress
                              value={100 - (contest.myRank / contest.participants) * 100}
                              className="h-1 mt-2"
                            />
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Top {Math.round((contest.myRank / contest.participants) * 100)}%</span>
                              <span className="text-xs text-muted-foreground">
                                {contest.myRank} of {contest.participants}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/contests/${contest.id}/problems`}>View Problems</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/contests/${contest.id}/leaderboard`}>View Leaderboard</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
