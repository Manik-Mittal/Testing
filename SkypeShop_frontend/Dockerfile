# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (for faster dependency installation)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
