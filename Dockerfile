# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files (yarn.lock opsional)
COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile || yarn install

COPY . .
RUN yarn build

# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static
COPY package.json yarn.lock* ./

RUN yarn install --production --frozen-lockfile || yarn install --production

EXPOSE 3000
CMD ["node", "build"]
