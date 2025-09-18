# --- STAGE 1: Builder/Tester ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Menjalankan test di dalam stage ini. Jika gagal, build akan berhenti.
RUN npm test


# --- STAGE 2: Production ---
# Memulai dari base image yang bersih
FROM node:18-alpine

WORKDIR /app

# Copy dependencies dan source code dari stage builder
# Karena kita adalah root, kita tidak perlu khawatir soal kepemilikan file
COPY --from=builder /app .

# Port tetap diekspos
EXPOSE 3000

# Aplikasi akan dijalankan sebagai user default, yaitu 'root'
CMD [ "node", "server.js" ]