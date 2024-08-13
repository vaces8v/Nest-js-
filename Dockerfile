FROM node:22-alpine AS build
WORKDIR /app
COPY *.json ./
RUN npm install --production
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate
RUN npm install --production
CMD ["node", "dist/main.js"]
