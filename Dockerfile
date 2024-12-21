# Production Dockerfile
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production runtime
FROM nginx:alpine

# Copy the built assets to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Add nginx configuration for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]