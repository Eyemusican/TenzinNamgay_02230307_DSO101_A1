# frontend/Dockerfile
FROM node:18-alpine

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs


EXPOSE 3000
CMD ["npm", "run", "dev"]
