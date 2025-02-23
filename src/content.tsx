// content.tsx
import type { PlasmoCSConfig } from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_DATA") {
    const bodyText = document.body.innerText

    // Extract emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const foundEmails = bodyText.match(emailRegex) || []
    const uniqueEmails = [...new Set(foundEmails)]

    // Extract phone numbers
    const phoneRegex = /(\+?\d[\d\s.-]{7,}\d)/g
    const foundPhones = bodyText.match(phoneRegex) || []
    const uniquePhones = [...new Set(foundPhones)]

    // Extract full links
    const anchorElements = Array.from(document.querySelectorAll("a[href]"))
    const foundLinks = anchorElements
      .map((a) => {
        try {
          return new URL(a.getAttribute("href") || "", document.baseURI).href
        } catch {
          return null
        }
      })
      .filter((link): link is string => link !== null)
    const uniqueLinks = [...new Set(foundLinks)]

    // Extract full image links
    const imageElements = Array.from(document.querySelectorAll("img[src]"))
    const foundImageLinks = imageElements
      .map((img) => {
        try {
          return new URL(img.getAttribute("src") || "", document.baseURI).href
        } catch {
          return null
        }
      })
      .filter((link): link is string => link !== null)
    const uniqueImageLinks = [...new Set(foundImageLinks)]

    sendResponse({
      emails: uniqueEmails,
      phones: uniquePhones,
      links: uniqueLinks,
      imageLinks: uniqueImageLinks,
      customMatches: []
    })
  } else if (request.type === "GET_CUSTOM") {
    const htmlText = document.documentElement.outerHTML
    let matches: string[] = []
    try {
      const re = new RegExp(request.regex, "g")
      let match
      while ((match = re.exec(htmlText)) !== null) {
        matches.push(match[1] ? match[1] : match[0])
      }
    } catch (e) {
      matches = []
    }
    sendResponse({ customMatches: matches })
  }
  return true
})

const Content = () => {
  return <></>
}

export default Content
