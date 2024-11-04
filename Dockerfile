FROM node:20-alpine

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json (atau yarn.lock) ke dalam direktori kerja
COPY package*.json ./

# Menginstall dependencies aplikasi
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Menyalin sisa file aplikasi ke dalam direktori kerja
COPY . .

# Mengekspos port yang akan digunakan
EXPOSE 5002

# Menetapkan perintah untuk menjalankan aplikasi di dalam container
CMD ["pm2-runtime", "start", "npm", "--", "start"]