FROM node:18-alpine

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "build"]
