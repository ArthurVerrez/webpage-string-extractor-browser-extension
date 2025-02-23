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

import imageIcon from "data-base64:~images/image.svg"
import linkIcon from "data-base64:~images/link.svg"
import mailIcon from "data-base64:~images/mail.svg"
import phoneIcon from "data-base64:~images/phone.svg"

interface ExtractionData {
  emails: string[]
  phones: string[]
  links: string[]
  imageLinks: string[]
}

const Popup = () => {
  const [data, setData] = useState<ExtractionData>({
    emails: [],
    phones: [],
    links: [],
    imageLinks: []
  })

  const handleGetData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "GET_DATA" },
          (response: ExtractionData) =>
            setData(
              response || { emails: [], phones: [], links: [], imageLinks: [] }
            )
        )
      }
    })
  }

  const handleCopyCSV = (list: string[]) => {
    const csv = list.join("\n")
    navigator.clipboard
      .writeText(csv)
      .catch((err) => console.error("Failed to copy as CSV:", err))
  }

  useEffect(() => {
    handleGetData()
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
                    alt="Email Icon"
                    className="rounded-none"
                  />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Emails</p>
                  <p className="text-sm text-muted-foreground">
                    {data.emails.length} detected
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCSV(data.emails)}>
                Copy as CSV
              </Button>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-none">
                  <AvatarImage
                    src={phoneIcon}
                    alt="Phone Icon"
                    className="rounded-none"
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Phone Numbers
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.phones.length} detected
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCSV(data.phones)}>
                Copy as CSV
              </Button>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-none">
                  <AvatarImage
                    src={linkIcon}
                    alt="Link Icon"
                    className="rounded-none"
                  />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Links</p>
                  <p className="text-sm text-muted-foreground">
                    {data.links.length} detected
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCSV(data.links)}>
                Copy as CSV
              </Button>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-none">
                  <AvatarImage
                    src={imageIcon}
                    alt="Image Icon"
                    className="rounded-none"
                  />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Image Links
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.imageLinks.length} detected
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCSV(data.imageLinks)}>
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
