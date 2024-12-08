# Use Node.js as the base image
FROM node:16-alpine


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install 

COPY . .

EXPOSE 5000

# Start the Express server
CMD ["node", "app.js"]
