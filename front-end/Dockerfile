# Use Node.js v14 as the build image
FROM node:14 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install node modules and build assets
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and serve the app
CMD ["nginx", "-g", "daemon off;"]

