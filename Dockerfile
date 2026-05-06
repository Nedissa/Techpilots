FROM node:20-alpine

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies for backend
WORKDIR /app/backend
RUN npm ci

# Build backend
RUN npm run build

# Set working directory back to backend for runtime
WORKDIR /app/backend

# Expose port for Medusa
EXPOSE 9000

# Start Medusa
CMD ["npm", "start"]
