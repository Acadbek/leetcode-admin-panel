"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

export function DetailedHelp() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Detailed Help Example</h2>

      <div className="rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-medium mb-4">How to Block a User</h3>

        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
            <TabsTrigger value="tips">Tips & Warnings</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="steps" className="mt-4">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Navigate to Users page</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    From the admin dashboard, click on "Users" in the main navigation menu.
                  </p>
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <img
                      src="https://kzmn7swcpgpm1k6z5htd.lite.vusercontent.net/placeholder.svg?height=200&width=500"
                      alt="Navigate to Users page"
                      width={500}
                      height={200}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Search for the user</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Use the search bar to find the user by username, email, or ID. You can also use advanced filters.
                  </p>
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <img
                      src="https://kzmn7swcpgpm1k6z5htd.lite.vusercontent.net/placeholder.svg?height=200&width=500"
                      alt="Search for user"
                      width={500}
                      height={200}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Click "Block User" from Admin Actions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Click on the user to view their profile, then find the "Admin Actions" dropdown menu and select
                    "Block User".
                  </p>
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <img
                      src="https://kzmn7swcpgpm1k6z5htd.lite.vusercontent.net/placeholder.svg?height=200&width=500"
                      alt="Block user action"
                      width={500}
                      height={200}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Confirm action</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    A confirmation dialog will appear. You must provide a reason for blocking the user and select a
                    block duration.
                  </p>
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <img
                      src="https://kzmn7swcpgpm1k6z5htd.lite.vusercontent.net/placeholder.svg?height=200&width=500"
                      alt="Confirm block action"
                      width={500}
                      height={200}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-4 space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Important Information</AlertTitle>
              <AlertDescription>
                Blocking a user will prevent them from logging in, submitting solutions, or participating in contests.
                They will receive an email notification about being blocked.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Blocking a user is logged in the admin audit trail</li>
                  <li>Super admins will be notified when users are blocked</li>
                  <li>Consider using temporary restrictions for first-time violations</li>
                  <li>Blocking premium users may trigger refund requests</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Alert variant="default" className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Best Practices</AlertTitle>
              <AlertDescription className="text-green-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always provide a clear reason when blocking users</li>
                  <li>Use temporary blocks for minor violations</li>
                  <li>Document the incident with screenshots if applicable</li>
                  <li>Consider warning users before blocking for minor infractions</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="examples" className="mt-4">
            <div className="space-y-6">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Example: Blocking a User for Code of Conduct Violation</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                  <p>User: johndoe123</p>
                  <p>Reason: Repeated harassment in discussion forums</p>
                  <p>Duration: 30 days</p>
                  <p>Admin Note: User has received 3 warnings previously</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Example: Blocking a User for Cheating</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                  <p>User: coder456</p>
                  <p>Reason: Submitting plagiarized solutions in contest #127</p>
                  <p>Duration: Permanent</p>
                  <p>Admin Note: Multiple instances of code plagiarism detected</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Example: Temporary Block for Spam</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                  <p>User: newuser789</p>
                  <p>Reason: Posting promotional content in discussion forums</p>
                  <p>Duration: 7 days</p>
                  <p>Admin Note: First violation, warning issued</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
