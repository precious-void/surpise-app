FROM node:12-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /app
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --only=prod

ENV MONGODB_URI=mongodb://localhost:27017/surprise
ENV MONGODB_URI_TEST=mongodb://localhost:27017/surprise-test

EXPOSE 9080
CMD ["npm", "start"]