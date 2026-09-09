FROM node:26-alpine AS base
RUN npm install -g yarn && npm cache clean --force
WORKDIR /app

FROM base AS deps

COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --network-timeout 600000

FROM base AS builder

ARG BASE_URL=https://codereviewhub.prathameshdhande.com
ENV BASE_URL=${BASE_URL}
ENV DATABASE_URL="postgresql://build:build@127.0.0.1:5432/build?schema=public"
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn db:generate && yarn build

RUN rm -rf .next/standalone/node_modules/@img/sharp-libvips-linux-x64 \
           .next/standalone/node_modules/@img/sharp-linux-x64

FROM node:26-alpine AS runner
WORKDIR /app

ARG BUILD_DATE
ARG GIT_SHA
ARG VERSION

LABEL org.opencontainers.image.created="${BUILD_DATE}" \
    org.opencontainers.image.authors="Prathamesh Dhande" \
    org.opencontainers.image.source="https://github.com/PrathameshDhande22/CodeReviewHub" \
    org.opencontainers.image.version="${VERSION}" \
    org.opencontainers.image.url="https://github.com/PrathameshDhande22/CodeReviewHub" \
    org.opencontainers.image.revision="${GIT_SHA}" \
    org.opencontainers.image.vendor="PrathameshDhande22" \
    org.opencontainers.image.title="CodeReview Hub" \
    org.opencontainers.image.description="Collaborative code review platform where developers post code and receive line-by-line peer reviews." \
    com.prathameshdhande.title="CodeReview Hub" \
    com.prathameshdhande.description="Platform to post code snippets and receive peer reviews." \
    com.prathameshdhande.project="CodeReview Hub" \
    com.prathameshdhande.repository="https://github.com/PrathameshDhande22/CodeReviewHub" \
    com.prathameshdhande.service="CodeReview Hub" \
    com.prathameshdhande.version="${VERSION}"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
    && adduser -u 1001 -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" || exit 1

CMD ["node", "server.js"]
