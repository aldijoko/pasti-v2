# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

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
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["node", "build"]
