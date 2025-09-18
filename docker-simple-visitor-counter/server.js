const express = require('express');
const Redis = require('ioredis');

const app = express();
const PORT = 3000;

// 'redis' adalah nama layanan Redis di docker-compose.yml produksi
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
});

app.get('/', async (req, res) => {
  try {
    const visits = await redisClient.incr('visits');
    res.send(`<h1>Hello from Docker CI/CD!</h1><p>Number of visits: ${visits}</p>`);
  } catch (err) {
    console.error('Redis connection error:', err);
    res.status(500).send('Error connecting to the backend service.');
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});