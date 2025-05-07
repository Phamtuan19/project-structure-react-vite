# Sử dụng node base image để tạo môi trường cho React
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và yarn.lock (hoặc package-lock.json) vào container
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm install --force

# Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Mở cổng 8088 để ứng dụng có thể được truy cập từ bên ngoài
EXPOSE 8088

# Chạy ứng dụng React
CMD ["npm", "run", "dev"]
