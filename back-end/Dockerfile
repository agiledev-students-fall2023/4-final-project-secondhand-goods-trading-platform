# Use Node.js v14 as the base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source inside the Docker image
COPY . .

# The app binds to port 3001 so use the EXPOSE instruction to have it mapped
EXPOSE 3001

# Define the command to run the app
CMD [ "npm", "start" ]
