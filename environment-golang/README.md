# EXPLANATION 

## Mengapa disini port tidak di definisikan di kode aplikasi saja

- Permulaan :
1. Disini artinya container membaca APP_PORT lewat os.Getenv("APP_PORT") di go
2. kenapa di definisikan pada Dockerfile? Jika port di aplikasi saat server sedang menampung banyak service.Kemungkinan bisa bertabrakan
3. Keuntungananya konfigurasi fleksibel, Best practice 12 factor app, Port mapping Docker lebih bebas.