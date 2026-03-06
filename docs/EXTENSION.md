# Browser Extension Development

## Setup
cd extension
npm install
npm run dev

## Architecture
- manifest.json - Extension manifest v3
- popup/ - Extension popup UI
- content/ - Content scripts
- background/ - Service worker

## Features
- Auto-scan visited pages
- Popup with scan results
- Block dangerous sites
- Whitelist management
- Sync with web app

## Building
npm run build

## Loading in Chrome
1. Go to chrome://extensions
2. Enable Developer mode
3. Click Load unpacked
4. Select the dist/ folderdocs: add browser extension development guide
