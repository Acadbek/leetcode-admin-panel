"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Find Help</h2>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search for help topics..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Popular FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to block a user?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the Users page in the admin panel</li>
                <li>Search for the user by username, email, or ID</li>
                <li>Click on the user to view their profile</li>
                <li>Click the "Block User" button from the Admin Actions dropdown</li>
                <li>Confirm the action in the modal that appears</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">
                Note: Blocked users cannot log in, submit solutions, or participate in contests.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How to reset user password?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the Users page in the admin panel</li>
                <li>Search for the user by username, email, or ID</li>
                <li>Click on the user to view their profile</li>
                <li>Click the "Reset Password" button from the Admin Actions dropdown</li>
                <li>A temporary password will be generated and sent to the user's email</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">
                Important: The user will be prompted to create a new password upon their next login.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How to add a new contest?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to the Contest Management section</li>
                <li>Click the "Create New Contest" button</li>
                <li>Fill in the required details: title, description, start/end times, rules</li>
                <li>Add problems to the contest from the problem bank or create new ones</li>
                <li>Set visibility and participation rules</li>
                <li>Preview the contest and click "Publish" when ready</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">Tip: You can save contests as drafts and publish them later.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How to view user submissions?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the Submissions page in the admin panel</li>
                <li>Use the filters to narrow down by user, problem, language, or status</li>
                <li>Click on any submission to view the code and execution details</li>
                <li>You can manually review, re-run tests, or flag submissions as needed</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">
                Note: All submissions are stored permanently and can be accessed at any time.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How to change site settings?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to the Site Settings section in the admin panel</li>
                <li>Select the category of settings you want to modify</li>
                <li>Make your changes to the configuration options</li>
                <li>Click "Save Changes" to apply the new settings</li>
                <li>Some settings may require a cache clear or service restart</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">
                Warning: Critical settings changes are logged and may require super admin approval.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
