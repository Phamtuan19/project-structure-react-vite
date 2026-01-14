# Multi-stage build để tối ưu kích thước image

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build ứng dụng React
RUN npm run build

# Stage 2: Production stage với nginx
FROM nginx:alpine

# Copy build files từ builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config tùy chỉnh (nếu có)
# COPY nginx.conf /etc/nginx/nginx.conf

# Mở cổng 80 (default nginx port)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
