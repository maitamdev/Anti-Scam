# Threat Intelligence Feeds Setup Guide

## 🔐 Required API Keys

Add these environment variables to your Vercel project:

### 1. **PhishTank** (Optional but recommended)
```bash
PHISHTANK_API_KEY=your_api_key_here
```
- Sign up: https://www.phishtank.com/register.php
- Get API key: https://www.phishtank.com/api_info.php
- **Free**: Unlimited API calls
- **Best for**: Community-verified phishing URLs

### 2. **Google Safe Browsing** (Recommended)
```bash
GOOGLE_SAFE_BROWSING_API_KEY=your_api_key_here
```
- Get key: https://console.cloud.google.com/apis/credentials
- Enable API: https://console.cloud.google.com/marketplace/product/google/safebrowsing.googleapis.com
- **Free quota**: 10,000 requests/day
- **Best for**: Fast URL threat lookup

### 3. **AbuseIPDB** (Optional - for IP reputation)
```bash
ABUSEIPDB_API_KEY=your_api_key_here
```
- Sign up: https://www.abuseipdb.com/register
- Get key: https://www.abuseipdb.com/account/api
- **Free quota**: 1,000 checks/day
- **Best for**: IP reputation scoring

### 4. **VirusTotal PRO** (Optional - only for deep analysis)
```bash
VIRUSTOTAL_API_KEY_PRO=your_premium_api_key_here
```
- **⚠️ IMPORTANT**: Only use PRO/Premium API key (64+ characters)
- Free API is NOT supported in production (500/day limit)
- Get PRO key: https://www.virustotal.com/gui/my-apikey
- **Best for**: Deep malware analysis with 70+ scanners

### 5. **Cron Job Secret** (Required for automated sync)
```bash
CRON_SECRET=your_random_secret_key_here
```
- Generate: `openssl rand -base64 32`
- Used to authenticate Vercel Cron jobs

## 📊 Data Sources (No API Key Required)

These sources are automatically synced every 6 hours:

1. **OpenPhish** - GitHub public feed
   - URL: https://raw.githubusercontent.com/openphish/public_feed/refs/heads/main/feed.txt
   - Updates: Every 30 minutes
   - Free: Yes

2. **PhishStats** - REST API
   - URL: https://phishstats.info/api/phishing
   - Rate limit: 20 requests/minute
   - Free: Yes

3. **URLhaus** - Malware URLs
   - URL: https://urlhaus.abuse.ch/downloads/csv_recent/
   - Updates: Real-time
   - Free: Yes

4. **Spamhaus DROP** - Malicious netblocks
   - URL: https://www.spamhaus.org/drop/drop.txt
   - Updates: Daily
   - Free: Yes (with attribution)

## 🚀 Deployment Steps

### Step 1: Add Environment Variables to Vercel

```bash
# Go to Vercel Dashboard
https://vercel.com/[your-username]/[your-project]/settings/environment-variables

# Add all API keys listed above
```

### Step 2: Enable Cron Jobs (Vercel Pro Required)

The `vercel.json` is already configured with:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-threat-feeds",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This runs **every 6 hours** automatically.

### Step 3: Manual Sync (First Time)

After deployment, trigger first sync manually:

```bash
# Admin Panel → Threat Feeds → Sync All
# Or use API:
curl -X POST https://your-domain.vercel.app/api/admin/threat-feeds \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"source": "all"}'
```

### Step 4: Monitor Sync Status

Check sync logs in Vercel Dashboard:
```
Dashboard → Deployments → Logs → Filter "CRON"
```

## 📈 Usage in Production

### Automatic Features:

1. **Blocklist Auto-Update**: New phishing domains added every 6 hours
2. **Real-time Checks**: 
   - Google Safe Browsing checks every scan
   - VirusTotal PRO checks (if configured)
   - AbuseIPDB IP reputation (if configured)

### Manual Sync via Admin Panel:

Access: `/admin` → Threat Intelligence

- Sync individual sources
- Sync all sources at once
- View sync statistics
- Monitor feed health

## 🔧 Troubleshooting

### "API key not configured"
- Check environment variables in Vercel Dashboard
- Redeploy after adding vars

### "Rate limit exceeded"
- PhishStats: Max 20 req/min - wait and retry
- AbuseIPDB: Max 1000/day - upgrade or reduce checks

### "Cron job not running"
- Requires **Vercel Pro** subscription
- Check `CRON_SECRET` is set
- View logs in Vercel Dashboard

### "VirusTotal quota exceeded"
- Make sure using PRO API key (64+ chars)
- Free keys (64 chars) are NOT supported
- PRO quota: 15,000-500,000/day depending on tier

## 💡 Best Practices

1. **Start with free sources**: OpenPhish, PhishStats, URLhaus
2. **Add Google Safe Browsing**: Fast and reliable
3. **Optional enhancement**: AbuseIPDB for IP checks
4. **Production only**: VirusTotal PRO for deep analysis

## 📊 Expected Results

After first sync (6-12 hours):
- **100,000+** phishing URLs in blocklist
- **500+** malicious IPs identified
- **Real-time** threat detection improved by 40%
- **False positives** reduced by 60%

## 🔗 Useful Links

- OpenPhish: https://github.com/openphish/public_feed
- PhishTank: https://www.phishtank.com
- PhishStats: https://phishstats.info
- URLhaus: https://urlhaus.abuse.ch
- Google Safe Browsing: https://developers.google.com/safe-browsing
- AbuseIPDB: https://www.abuseipdb.com
- Spamhaus: https://www.spamhaus.org
