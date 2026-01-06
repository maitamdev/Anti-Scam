FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/shared ./packages/shared
COPY apps/game-server ./apps/game-server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
WORKDIR /app/apps/game-server
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 2567

CMD ["node", "dist/index.js"]
