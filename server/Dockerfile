FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY seed ./seed
ENV DATA_DIR=/app/data
EXPOSE 8787
CMD ["node", "src/index.js"]
