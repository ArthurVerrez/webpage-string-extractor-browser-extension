// popup.tsx
import { useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar"
import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"

import "~style.css"

import mailIcon from "data-base64:~images/mail.svg"

const Popup = () => {
  const [emails, setEmails] = useState<string[]>([])

  const handleGetEmails = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "GET_EMAILS" },
          (response) => setEmails(response || [])
        )
      }
    })
  }

  const handleCopyCSV = () => {
    const csv = emails.join(",")
    console.log(csv)
    navigator.clipboard
      .writeText(csv)
      .catch((err) => console.error("Failed to copy emails as CSV:", err))
  }

  useEffect(() => {
    handleGetEmails()
  }, [])

  return (
    <div className="bg-white p-2 w-96">
      <Card>
        <CardHeader>
          <CardTitle>Extract from webpage</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-none">
                  <AvatarImage
                    src={mailIcon}
                    alt="Image"
                    className="rounded-none"
                  />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Emails</p>
                  <p className="text-sm text-muted-foreground">
                    {emails.length} detected
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyCSV}>
                Copy as CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Popup
