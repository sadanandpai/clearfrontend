import {
  AdminClientAppwrite,
  BaseClientAppWrite,
  DatabaseClientAppwrite,
  SessionClientAppwrite,
} from "./appwrite";
import { RedisClient } from "./redis";

export class ServiceClient {
  get user() {
    return {
      authenticated: async () => {
        return await SessionClientAppwrite.getInstance();
      },
      admin: async () => {
        return await AdminClientAppwrite.getInstance();
      },
      guest: async () => {
        return await BaseClientAppWrite.getInstance();
      },
    };
  }

  async database() {
    return await DatabaseClientAppwrite.getInstance();
  }

  cache() {
    return RedisClient.getInstance().redisInstance;
  }
}

export const serviceClient = new ServiceClient();
