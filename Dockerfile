FROM node:18-alpine as base

FROM base as deps

RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm install

from base as build

RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

from base

RUN mkdir /app
WORKDIR /app
RUN mkdir build

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
ADD . .

CMD ["node", "./build"]
