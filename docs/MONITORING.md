# Monitoring & Observability

## Health Check
GET /api/health -> {status, timestamp, version, uptime}

## Metrics
- Total scans per day
- Average response time
- Error rate
- Active users
- API key usage

## Logging
- Structured JSON logs
- Log levels: debug, info, warn, error
- Audit logs for security events

## Alerting
- Error rate > 5%
- Response time > 2s
- Database connection failures
- API quota exceeded

## Status Page
/status - Public system status page
/api/health - Health check endpointdocs: add monitoring and observability guide
