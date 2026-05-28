import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDISHOST,
  port: Number(process.env.REDISPORT),
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err) => {
  console.log("Redis Error:", err);
});

export default redis;