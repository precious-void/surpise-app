FROM node:12-alpine as builder

WORKDIR /backend
COPY package.json /backend/package.json
COPY . /backend

RUN npm install
RUN npm run build

EXPOSE 9080
CMD ["npm", "start"]
