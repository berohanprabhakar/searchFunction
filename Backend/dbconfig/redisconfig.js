const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        connectTimeout: 30000 // 30 seconds
    }
});

redisClient.on('connect', () =>{
    console.log('Connected to Redis');
});

redisClient.on('error', (err) =>{
    console.error('Redis error', err);
});

redisClient.connect();

module.exports = redisClient;