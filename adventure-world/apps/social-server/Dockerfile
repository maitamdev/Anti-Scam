FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/shared ./packages/shared
COPY apps/social-server ./apps/social-server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
WORKDIR /app/apps/social-server
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/index.js"]
