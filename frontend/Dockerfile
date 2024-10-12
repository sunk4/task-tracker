# Stage 1: Build the frontend
FROM node:18-alpine3.14 AS build

WORKDIR /app
COPY ./ ./

# Install dependencies and build the project
RUN npm install
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built frontend files from the previous stage
COPY --from=build /app/dist /var/www/html/
# Copy the Nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
