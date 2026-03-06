# Payment Integration (Stripe)

## Plans
| Plan | Price | Features |
|------|-------|----------|
| Free | 0 | 5 scans/day |
| Pro | 99k VND/mo | 50 scans/day, image scan |
| Business | 299k VND/mo | 500 scans/day, API access |
| Enterprise | Custom | Unlimited, custom features |

## Webhooks
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed

## Upgrade Flow
1. User clicks upgrade
2. Redirect to Stripe Checkout
3. Webhook updates tier
4. User redirected backdocs: add payment integration documentation
