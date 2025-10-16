`docker-compose.yml`, `Dockerfile`, dan `entrypoint.sh` saling terhubung untuk membentuk **workflow container Laravel**. berikut alur lebih jelas

---

## Alur ketiga file

### 1. **`docker-compose.yml`**

* File ini **mengatur orkestrasi service**:

  * `app` → Laravel + PHP-FPM (dibangun dari `Dockerfile`).
  * `nginx` → Web server untuk handle request HTTP.
  * `db` → Database MySQL.
* Compose menghubungkan semua service dalam **satu network internal**, sehingga `app` bisa akses `db` hanya dengan hostname `db`.
* `app` service di sini menunjuk ke `Dockerfile` untuk build image kustom Laravel.

Jadi, `docker-compose.yml` adalah **peta arsitektur aplikasi**.

---

### 2. **`Dockerfile`**

* Dipakai oleh service `app` dalam `docker-compose.yml` untuk membangun **image Laravel**.
* Tugasnya:

  1. Install PHP-FPM + extension Laravel.
  2. Install Composer.
  3. Copy source code project ke dalam container.
  4. Copy script startup `entrypoint.sh`.
  5. Set `ENTRYPOINT ["entrypoint.sh"]`.

Jadi, `Dockerfile` adalah **resep membangun container Laravel**.

---

### 3. **`entrypoint.sh`**

* Script yang otomatis dijalankan saat container `app` start (karena diset di `Dockerfile`).
* Tugasnya:

  1. Setup environment Laravel (`.env`, `APP_KEY`).
  2. Tunggu database MySQL siap.
  3. Jalankan migrasi + seeder.
  4. Atur permission folder Laravel.
  5. Start PHP-FPM (proses utama Laravel).

Jadi, `entrypoint.sh` adalah **otomatisasi bootstrap Laravel** di dalam container.

---

## 🔄 Alur Kerjanya

1. Kamu jalankan:

   ```bash
   docker-compose up -d
   ```

2. **Docker Compose (`docker-compose.yml`)**

   * Buat 3 service (`app`, `nginx`, `db`).
   * `app` dibangun pakai `Dockerfile`.
   * `nginx` pakai image `nginx:alpine`.
   * `db` pakai image `mysql:5.7`.

3. **Dockerfile (service app)**

   * Install dependency Laravel.
   * Copy kode project.
   * Set `entrypoint.sh` sebagai entrypoint container.

4. **Entrypoint.sh**

   * Saat container `app` start, script ini jalan otomatis:

     * `composer update`
     * buat `.env` kalau belum ada
     * `php artisan key:generate`
     * tunggu `db` service siap
     * `php artisan migrate && db:seed`
     * set permission folder
     * jalankan `php-fpm`

5. **Nginx**

   * Nginx menerima request di `http://localhost:8000`.
   * Nginx forward request PHP ke `app` (PHP-FPM di port 9000).
   * Laravel (`app`) konek ke `db` untuk query database.

6. default.conf

- File konfigurasi Nginx.

1. Mengatur agar:

2. Request biasa (/, route Laravel) diarahkan ke index.php.
 
3. Request PHP diteruskan ke service app di port 9000.

4. fastcgi_pass app:9000;

---

## (Diagram Sederhana)

```
docker-compose.yml
   ├── service: app ──> Dockerfile ──> entrypoint.sh ──> php-fpm
   ├── service: nginx (web server)
   └── service: db (MySQL)
```

* **docker-compose.yml** → orkestrasi.
* **Dockerfile** → resep build Laravel app container.
* **entrypoint.sh** → script otomatisasi sebelum PHP-FPM jalan.

---



## Alur konfigurasi utama

1. User buka browser → akses http://localhost:8000.

2. docker-compose.yml

3. Port 8000 host diarahkan ke 80 di container nginx.

4. Nginx (default.conf)

5. Terima request → cek file statis (css, js, image).

6. Kalau route Laravel (/login, /dashboard) → lempar ke index.php.

7. Untuk file PHP, diteruskan ke app:9000.

8. App (Laravel via Dockerfile + entrypoint.sh)

9. PHP-FPM menerima request dari Nginx.

10. Laravel jalan → query ke database.

11. DB (MySQL)

12. Laravel konek ke MySQL service db.

13. Response balik → Laravel → PHP-FPM → Nginx → Browser user.

🔗 Hubungan Sederhana (Diagram Text)
docker-compose.yml
   ├── service: nginx ──> pakai default.conf (atur request)
   ├── service: app ──> Dockerfile ──> entrypoint.sh ──> php-fpm (9000)
   └── service: db (MySQL)

User → localhost:8000 → nginx (default.conf) → app:9000 (php-fpm/Laravel) → db


## Jadi ringkasnya:

docker-compose.yml → “peta” seluruh service & network.

Dockerfile → “resep” bikin image Laravel (app).

entrypoint.sh → “otak” bootstrap Laravel sebelum php-fpm jalan.

default.conf → “jembatan” request web dari user → Nginx → Laravel (app:9000).

## Berikut link github repo dari Aplikasi Laravel
https://github.com/bta-adinusa/perpus-laravel 