// content.tsx
import { createTRPCProxyClient } from "@trpc/client"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import { chromeLink } from "trpc-chrome/link"

import type { AppRouter } from "~background"
import { Button } from "~components/ui/button"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_EMAILS") {
    const bodyText = document.body.innerText
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const found = bodyText.match(emailRegex) || []
    const unique = [...new Set(found)]
    sendResponse(unique)
  }
  return true
})

const IncrementButton = () => {
  return <></>
}

export default IncrementButton
