# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app



# Copy file dependency (biar caching lebih efisien)
COPY package*.json ./

# Install semua dependency (include dev untuk build)
RUN npm install

# Copy semua source code
COPY . .

# Build project (hasil ke /app/build)
RUN npm run build

# --- Stage 2: Runtime ---
FROM node:20-alpine
WORKDIR /app

# Copy hanya file yang dibutuhkan
COPY package*.json ./

# Install hanya dependency production
RUN npm install --omit=dev

# Copy hasil build dari stage builder
COPY --from=builder /app/build ./build

# Copy file config yang dibutuhkan (opsional)
COPY --from=builder /app/svelte.config.js ./
COPY --from=builder /app/vite.config.js ./
COPY --from=builder /app/static ./static

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000


EXPOSE 3000

CMD ["node", "build"]
