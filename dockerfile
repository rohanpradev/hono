FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install dependencies and build
FROM base AS build
# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev) for build
RUN bun install --production

# Copy source files
COPY . .

# Build the project
RUN bun build:code

# Clean up node_modules (optional if not copying from here)
RUN rm -rf node_modules

# Production image
FROM oven/bun:latest AS release
WORKDIR /usr/src/app

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy built files and production dependencies only
COPY package.json ./
COPY tsconfig.json ./
COPY --from=build /usr/src/app/dist/index.js ./index.js

# Expose Port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["bun","run", "index.js"]