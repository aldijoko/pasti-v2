# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files (yarn.lock opsional)
COPY package.json yarn.lock* ./

# Install semua dependency (termasuk devDependencies, perlu untuk build SvelteKit)
RUN yarn install --frozen-lockfile || yarn install

# Copy semua source code
COPY . .

# Build aplikasi (adapter-node menghasilkan folder build/)
RUN yarn build


# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Environment runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Copy hasil build dari builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

# Copy package.json (untuk dependencies runtime)
COPY package.json yarn.lock* ./

# Install hanya dependency production
RUN yarn install --production --frozen-lockfile || yarn install --production

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "build"]
