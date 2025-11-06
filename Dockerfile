# Multi-stage Dockerfile for Next.js with Playwright support
# Stage 1: Dependencies
FROM node:20-slim AS deps

# Install system dependencies for Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install pnpm if not available
RUN npm install -g pnpm@latest

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# Copy application code
COPY . .

# Verify Prisma schema exists
RUN test -f prisma/schema.prisma || (echo "Error: prisma/schema.prisma not found" && exit 1)

# Install Playwright browsers (Chromium)
RUN npx playwright install chromium --with-deps || true

# Generate Prisma Client (doesn't need DATABASE_URL, just generates types)
# Set a dummy DATABASE_URL to avoid any potential issues
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN echo "Generating Prisma Client..." && \
    pnpm exec prisma generate && \
    echo "Prisma Client generated successfully"

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 3: Runner (Production)
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install runtime dependencies for Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

# Copy necessary files from standalone build
# Next.js standalone output structure
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma client and Playwright (standalone includes minimal node_modules)
# We need to ensure Prisma and Playwright are available
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/playwright ./node_modules/playwright

# Copy Playwright browsers to user-accessible location
COPY --from=builder /root/.cache/ms-playwright /home/nextjs/.cache/ms-playwright

# Copy Prisma schema for migrations (if needed)
COPY --from=builder /app/prisma ./prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app && \
    chown -R nextjs:nodejs /home/nextjs/.cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

