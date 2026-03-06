# Anti-Scam API Documentation

## Base URL
https://antiscam.vn/api

## Authentication
All API requests require an API key in the header:
Authorization: Bearer YOUR_API_KEY

## Rate Limits
- Free: 5 requests/day
- Pro: 100 requests/day
- Business: 1000 requests/day

## Endpoints

### POST /api/scan
Scan a URL for scam indicators.

Request: {url: string, source?: string}
Response: {success: boolean, data: ScanResult}

### POST /api/scan-image
Scan an image for scam content.

### GET /api/history
Get scan history for authenticated user.

### POST /api/report
Report a scam URL.

### GET /api/stats
Get platform statistics.docs: add comprehensive API documentation
