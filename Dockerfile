FROM node:20-alpine

WORKDIR /app

# Copy only backend directory
COPY backend ./

# Install dependencies
RUN npm ci

# Start Medusa (no build needed for Medusa v2)
EXPOSE 9000

CMD ["npm", "start"]
