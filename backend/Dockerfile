FROM node:12-alpine as builder

COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

ENV MONGODB_URI=mongodb://localhost:27017/surprise
ENV MONGODB_URI_TEST=mongodb://localhost:27017/surprise-test

# Expose port 9080
EXPOSE 9080
CMD npm run start
