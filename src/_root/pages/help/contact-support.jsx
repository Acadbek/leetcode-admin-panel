"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Bug, Send } from "lucide-react"

export function ContactSupport() {
  const [issueType, setIssueType] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({ issueType, message })
    // Reset form
    setIssueType("")
    setMessage("")
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Can't Find What You Need?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Contact Super Admin
            </CardTitle>
            <CardDescription>Get help from the platform super administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="issue-type" className="text-sm font-medium">
                    Issue Type
                  </label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permissions">Permissions Issue</SelectItem>
                      <SelectItem value="technical">Technical Problem</SelectItem>
                      <SelectItem value="user">User Management</SelectItem>
                      <SelectItem value="content">Content Moderation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4 w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-red-600" />
              Report a Bug
            </CardTitle>
            <CardDescription>Report technical issues or bugs in the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bug-title" className="text-sm font-medium">
                    Bug Title
                  </label>
                  <Input id="bug-title" placeholder="Brief description of the bug" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bug-location" className="text-sm font-medium">
                    Where did you encounter this bug?
                  </label>
                  <Select>
                    <SelectTrigger id="bug-location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">User Management</SelectItem>
                      <SelectItem value="contests">Contest Management</SelectItem>
                      <SelectItem value="problems">Problem Management</SelectItem>
                      <SelectItem value="submissions">Submissions</SelectItem>
                      <SelectItem value="settings">Site Settings</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="bug-description" className="text-sm font-medium">
                    Bug Description
                  </label>
                  <Textarea id="bug-description" placeholder="Please provide steps to reproduce the bug..." rows={5} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bug-severity" className="text-sm font-medium">
                    Severity
                  </label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="bug-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - System Unusable</SelectItem>
                      <SelectItem value="high">High - Major Feature Broken</SelectItem>
                      <SelectItem value="medium">Medium - Feature Partially Working</SelectItem>
                      <SelectItem value="low">Low - Minor Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="mt-4 w-full">
                <Bug className="h-4 w-4 mr-2" />
                Submit Bug Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          For urgent issues, please contact the development team directly at{" "}
          <a href="mailto:dev-team@example.com" className="text-blue-600 hover:underline">
            dev-team@example.com
          </a>
        </p>
      </div>
    </section>
  )
}
