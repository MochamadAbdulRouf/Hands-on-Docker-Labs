Mini project modul untuk mempelajari **Docker** dan **Docker Compose** dengan membuat sebuah lingkungan sederhana yang terdiri dari **API Service** dan **Database**, dihubungkan melalui custom network.

## Cara Menjalankan project ini

1. Clone repo ini
```bash
   cd microstack-docker-lab
```

2. Jalankan container dengan Docker Compose

```bash
   docker compose up -d
```

3. Akses API service di browser atau menggunakan curl

```bash
   curl http://localhost:8080
```

4. Untuk mematikan container + network + volume

```bash
   docker compose down -v
```

# HASIL AKHIR TEST DI BROWSER
![documentation](image/Screenshot_1.png)


Feel free to modify and experiment 🚀

