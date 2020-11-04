FROM node:12-alpine as builder

WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install
COPY . /frontend
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /frontend/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
