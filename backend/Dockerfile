# Step 1: Build the NestJS app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build

# Step 2: Run the app
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built files and node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment to production
ENV NODE_ENV=production

# Expose the backend port (default: 3001)
EXPOSE 3001

# Start the NestJS server
CMD ["npm","start"]
