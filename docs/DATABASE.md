# Database Schema Documentation

## Core Models
- **User**: User accounts with roles and tiers
- **Scan**: URL scan results
- **Report**: Community scam reports
- **Blocklist**: Blocked domains
- **Whitelist**: Trusted domains

## Quiz Models
- **QuizAttempt**: Quiz results
- **Campaign**: Training campaigns

## Business Models
- **Organization**: Business accounts
- **ApiKey**: API access keys
- **Watchlist**: Monitored items

## Analytics
- **ScanStat**: Daily scan statistics
- **CommunityContribution**: User contributions

## Relationships
User -> Scan (1:N)
User -> Report (1:N)
User -> ApiKey (1:N)
Organization -> User (N:N)docs: add database schema documentation
