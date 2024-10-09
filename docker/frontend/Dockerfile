FROM node:18-alpine3.14 AS build

WORKDIR /app
COPY ./frontend/ ./

RUN apk add --no-cache openjdk11-jre

RUN npm install
RUN npm run generate-api
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
COPY ./frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]