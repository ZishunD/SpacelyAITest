# Step 1: Build the NestJS app
FROM node:18-alpine

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the backend port (default: 3001)
EXPOSE 3001

# Start the NestJS server
CMD ["npm","run","dev"]
