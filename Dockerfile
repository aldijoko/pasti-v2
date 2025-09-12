# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci

# Copy source code
COPY . .

# Build the SvelteKit app (adapter-node)
RUN npm run build


# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Copy built output only
COPY --from=builder /app/build ./build

# If you serve any static files at runtime, uncomment this:
# COPY --from=builder /app/static ./static

EXPOSE 3000

CMD ["node", "build"]

