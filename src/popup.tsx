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
import { Input } from "~components/ui/input"
import { Separator } from "~components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~components/ui/tooltip"

import "~style.css"

import codeIcon from "data-base64:~images/code.svg"
import imageIcon from "data-base64:~images/image.svg"
import linkIcon from "data-base64:~images/link.svg"
import mailIcon from "data-base64:~images/mail.svg"
import phoneIcon from "data-base64:~images/phone.svg"

interface ExtractionData {
  emails: string[]
  phones: string[]
  links: string[]
  imageLinks: string[]
  customMatches: string[]
}

const Popup = () => {
  const [data, setData] = useState<ExtractionData>({
    emails: [],
    phones: [],
    links: [],
    imageLinks: [],
    customMatches: []
  })
  const [customRegex, setCustomRegex] = useState("")

  const handleGetData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "GET_DATA" },
          (response: ExtractionData) =>
            setData(
              response || {
                emails: [],
                phones: [],
                links: [],
                imageLinks: [],
                customMatches: []
              }
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

  useEffect(() => {
    if (customRegex) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id !== undefined) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "GET_CUSTOM", regex: customRegex },
            (response: { customMatches: string[] }) => {
              setData((prev) => ({
                ...prev,
                customMatches: response?.customMatches || []
              }))
            }
          )
        }
      })
    } else {
      setData((prev) => ({ ...prev, customMatches: [] }))
    }
  }, [customRegex])

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
            <Separator />
            <div className="flex items-center justify-between space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-4">
                      <Avatar className="rounded-none">
                        <AvatarImage
                          src={codeIcon}
                          alt="Code Icon"
                          className="rounded-none"
                        />
                        <AvatarFallback>R</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          Custom HTML Regex
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.customMatches.length} detected
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Applied on the HTML of the page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCSV(data.customMatches)}>
                Copy as CSV
              </Button>
            </div>
            <div>
              <Input
                placeholder="<span.*>(.*)</span>"
                value={customRegex}
                onChange={(e) => setCustomRegex(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Popup
