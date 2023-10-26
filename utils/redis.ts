import Redis from "ioredis"; // Use 'import Redis' instead of 'import { Redis }'

require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    // Change 'process.env.Redis_URL' to 'process.env.REDIS_URL'
    console.log(`Redis connected`);
    return process.env.REDIS_URL;
  }
  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient());
