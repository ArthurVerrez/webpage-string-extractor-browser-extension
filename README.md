# Webpage String Extractor Browser Extension

An extension that extracts various types of information from any webpage.

Built using [Plasmo](https://www.plasmo.com/), [React](https://reactjs.org/), and [Shadcn UI](https://ui.shadcn.com/).  
Compatible with Google Chrome (Manifest V3).

![Extension Screenshot](./extension_screenshot.png)

## Features

- **Email Extraction**: Finds and lists all email addresses on the current webpage.
- **Phone Number Extraction**: Identifies and displays all phone numbers on the page.
- **Link Extraction**: Captures all hyperlinks on the page, including their text labels (if any).
- **Image Extraction**: Gathers image sources (URLs) and alt-texts.

---

## Installation

TBD

> **Note**: The above process is for Chrome. Other Chromium-based browsers (Edge, Brave, etc.) have similar steps.

---

## Usage

1. **Open the extension** from your browser toolbar after installation.
2. **Select the type of data** you want to extract (e.g., emails, phone number, links, images).
3. **Click “Extract”** to parse the current webpage and display the matching results.
4. **Export or copy** the extracted data as needed.

---

## Development

If you want to actively develop or modify the extension, use the following workflow:

1. **Clone & Install**:
   ```bash
   git clone https://github.com/ArthurVerrez/webpage-string-extractor-browser-extension
   cd webpage-string-extractor-browser-extension
   pnpm install
   ```
2. **Start the Dev Build**:

   ```bash
   pnpm dev
   ```

   This command watches for file changes and updates the extension build in real time.

3. **Load Unpacked** in Chrome:

   - Navigate to `chrome://extensions/`
   - Ensure **Developer mode** is enabled.
   - Click **Load unpacked** and select the generated `chrome-mv3-dev/` folder.

4. **Iterate & Refresh**:
   - Whenever you make changes, the build folder is updated automatically.

---

Happy extracting! If you encounter any issues or have suggestions, please [open an issue](https://github.com/ArthurVerrez/webpage-string-extractor-browser-extension/issues).
