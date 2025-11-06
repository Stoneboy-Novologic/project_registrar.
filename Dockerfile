# Multi-stage Dockerfile for Next.js with Playwright support
# Stage 1: Dependencies
FROM node:20-slim AS deps

# Install system dependencies for Playwright with error handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
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
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install pnpm if not available
RUN npm install -g pnpm@latest || \
    (echo "Error: Failed to install pnpm" && exit 1)

# Install dependencies with error handling
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN echo "Installing dependencies..." && \
    pnpm install --frozen-lockfile || \
    (echo "Error: Dependency installation failed" && exit 1) && \
    echo "Dependencies installed successfully"

# Stage 2: Builder
FROM node:20-slim AS builder

WORKDIR /app

# Install additional build dependencies including timeout command
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    coreutils \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Ensure pnpm is available in builder stage
RUN corepack enable && corepack prepare pnpm@latest --activate || npm install -g pnpm@latest

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# Copy application code
COPY . .

# Verify Prisma schema exists
RUN test -f prisma/schema.prisma || (echo "Error: prisma/schema.prisma not found" && exit 1)

# Install Playwright browsers (Chromium) with robust retry logic
# This is non-blocking - build will continue even if Playwright installation fails
ENV PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright
RUN set -eux; \
    echo "========================================="; \
    echo "Installing Playwright Chromium..."; \
    echo "========================================="; \
    mkdir -p "$PLAYWRIGHT_BROWSERS_PATH"; \
    PLAYWRIGHT_SUCCESS=false; \
    for i in 1 2 3 4; do \
      echo "Attempt $i of 4..."; \
      if npx playwright install chromium --with-deps; then \
        echo "✓ Playwright installed successfully on attempt $i"; \
        PLAYWRIGHT_SUCCESS=true; \
        break; \
      else \
        echo "✗ Attempt $i failed (this is non-fatal)"; \
        sleep $((i * 5)); \
      fi; \
    done; \
    if [ "$PLAYWRIGHT_SUCCESS" = "false" ]; then \
      echo "⚠ Warning: Playwright Chromium installation failed after all attempts"; \
      echo "⚠ This is non-fatal - the application will still build"; \
      echo "⚠ Playwright can be installed at runtime if PDF generation is needed"; \
      mkdir -p "$PLAYWRIGHT_BROWSERS_PATH"; \
    fi; \
    true

# Generate Prisma Client (doesn't need DATABASE_URL, just generates types)
# Set a dummy DATABASE_URL to avoid any potential issues
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN echo "Generating Prisma Client..." && \
    pnpm exec prisma generate || \
    (echo "Error: Prisma generate failed" && exit 1) && \
    echo "Prisma Client generated successfully"

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN echo "Building Next.js application..." && \
    pnpm build || \
    (echo "Error: Next.js build failed" && exit 1) && \
    echo "Next.js build completed successfully"

# Stage 3: Runner (Production)
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PLAYWRIGHT_BROWSERS_PATH=/home/nextjs/.cache/ms-playwright

# Install runtime dependencies for Playwright with error handling
RUN echo "Installing runtime dependencies..." && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
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
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean \
    && echo "✓ Runtime dependencies installed"

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

# Copy necessary files from standalone build
# Next.js standalone output structure
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Standalone already includes required node_modules
# No additional copies from /app/node_modules are needed here

# Copy Playwright browsers to user-accessible location
# The directory is guaranteed to exist in builder (created even if installation failed)
RUN mkdir -p /home/nextjs/.cache
COPY --from=builder /root/.cache/ms-playwright /home/nextjs/.cache/ms-playwright
RUN if [ -d "/home/nextjs/.cache/ms-playwright" ] && [ "$(ls -A /home/nextjs/.cache/ms-playwright 2>/dev/null)" ]; then \
        echo "✓ Playwright browsers copied successfully"; \
    else \
        echo "⚠ Warning: Playwright browsers directory is empty, will be installed at runtime if needed"; \
    fi && \
    chown -R nextjs:nodejs /home/nextjs/.cache

# Copy Prisma schema for migrations (if needed)
COPY --from=builder /app/prisma ./prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app && \
    chown -R nextjs:nodejs /home/nextjs/.cache || true

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

