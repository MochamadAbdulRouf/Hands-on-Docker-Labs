# 1. Gunakan base image pyhton versi
FROM python:3.9-slim

# 2. Atur direktori kerja di dalam kontainer
WORKDIR /app

# 3. Salin file requirements ke dan install dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Salin semmua file ke direktori lokal didalam /app
COPY . .

# 5. Beritahu atau expos port bahwa container running di poer 5000 sesuai di file app.py
EXPOSE 5000

# 6. Jalankan aplikasi ketika container di start
CMD ["python", "app.py"]