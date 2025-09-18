
# Menggunakan base image yang minimalis (alpine) untuk proses build
# Kita beri nama stage ini 'builder' agar bisa di rujuk nanti
FROM node:18-alpine AS builder

# Set direktori kerja didalam container
WORKDIR /app

# Copy package.json dan package-lock.json dulu
# Docker akan men-cache layer ini. 'npm install' hanya akan dijalanlkan ulang
# Jika ada perubahan di kedua file ini, Bukan setiap kali kode kita berubah
COPY package.json package-lock.json ./
RUN npm install

# Sekarang, Copy sisa source code aplikasi kita
COPY . .

# Jalankan perintah build untuk meng-compile React menjadi file statis.
# Hasilnya akan ada di folder /app/build 
RUN npm run build

# Kita mulai dari base image baru yang sangat kecil dan sudah teroptimasi
# Untuk menyajikan konten web, yaitu nginx alpine
FROM nginx:stable-alpine

# Copy hanya hasil build (file statis) dari stage 'builder'
# Ke direktori default Nginx untuk menyajikan konten web
# Ini adalah inti dari "multi-stage build"
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80, port default untuk Nginx
EXPOSE 80

# Perintah default Nginx untuk menjalankan web server
CMD ["nginx", "-g", "daemon off;"]