FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS Install
# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json ./

# Install dependencies excluding dev dependencies
RUN bun install --production=true

# Build Stage
FROM base AS Build
# Install curl for health check
RUN apt-get update && apt-get install -y curl

Copy dependencies from Install stage
COPY --from=Install /usr/src/app/node_modules ./node_modules

# Copy source files
COPY . .

# Install dev dependencies and build the project
RUN bun install --production=false
RUN bun build:code

# Production image
FROM oven/bun:latest AS release
WORKDIR /usr/src/app

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# Copy built files and dependencies from Build stage
COPY --from=Build /usr/src/app/dist/index.js ./index.js
COPY package.json ./
COPY .env* ./

Change ownership to a non-root user
RUN chown -R nobody:nobody /usr/src/app

# Use non root user
USER nobody

# Expose Port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["bun","run", "index.js"]