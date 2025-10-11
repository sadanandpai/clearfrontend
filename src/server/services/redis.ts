import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "@/server/config/redis.config";

export class RedisClient {
  private static instance: RedisClient | null = null;
  public redisInstance: Redis;

  private constructor() {
    this.redisInstance = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: process.env.NEXT_REDIS_PASSWORD,
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}
