const express = require('express');
const { Pool } = require('pg');

// Konfigurasi koneksi ke PostgreSQL Menggunakan environment Variables
const app = express();
const PORT = 3000;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, // Menggunakan nama service 'db' dari docker-compose
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, // Kesalahanan saya disini kesalahan ejaan passowrd padahal harus di tulis password
    port: 5432,
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as time');
        res.json({ 
            message: "Successfully connected to database!",
            db_time: result.rows[0].time 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
    }
});

app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`); // saya mengalami kesalahan juga disini karena menggunakan '..' seharusnya `..`
});

// note:
// Kesalahan yang saya definisikan di kode di atas membuat webapp error dengan log password failed dan
// Di browser muncul error connecting to database namun sekarang kode sudah di perbaiki seharusnya muncul
// Di browser pesan Successfully connected to database! dan waktu dari database