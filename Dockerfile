# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy npm manifests (use npm only)
COPY package.json package-lock.json* ./

# Install dependencies (dev deps included for build)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy source
COPY . .

# Build SvelteKit (adapter-node -> build/) using Vite CLI
RUN npx vite build


# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Copy built output (and static if needed)
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

EXPOSE 3000

CMD ["node", "build"]
