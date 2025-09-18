# Berikut Dockerfile yang lebih aman dan efisien

# --- STAGE 1 : Build Stage --- 
# Menggunakan base image spesifik dengan digest SH256 untuk keamanan dan konsistensi
FROM node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e AS builder


WORKDIR /usr/src/app

# Menggunakan --production flag untuk tidak menginstall devDependencies 
COPY package*.json ./
RUN npm install --production 

# --- STAGE 2 : Production Stage ---
# Memulai dari base image yang benar benar kosong dan minimalis 
FROM node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e

# --- BEST PRATICE: NON-ROOT USER ---
# Membuat group dan user sistem yang tidak memiliki hak istimewa
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

#  Mengatur direktori kerja dan memberikan kepemilikan ke user baru kita
WORKDIR /usr/src/app
COPY --from=builder --chown=appuser:appgroup /usr/src/app .
COPY --chown=appuser:appgroup . .

# Mengganti user dari root ke appuser
USER appuser

EXPOSE 8080

# --- BEST PRACTICE: HEALTHCHECK ---
# Memberi tahu Docker cara memerika apakah aplikasi kita masih sehat
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD wget -q --tries=1 -O- http://10.10.10.12:8080/health || exit 1

CMD [ "node", "server.js"] 