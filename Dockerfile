FROM node:22-alpine AS build
WORKDIR /app
COPY *.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --production
CMD ["node", "dist/main.js"]
