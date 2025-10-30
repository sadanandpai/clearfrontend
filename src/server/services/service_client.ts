import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  AdminClientAppwrite,
  BaseClientAppWrite,
  DatabaseClientAppwrite,
  SessionClientAppwrite,
} from "./appwrite";
import { RedisClient } from "./redis";
import { COOKIE_NAME } from "../config/server.config";
import { getCookie } from "../utils/cookies";

export class ServiceClient {
  get user() {
    return {
      authenticated: async () => {
        const sessionCookie: RequestCookie | undefined = await getCookie(COOKIE_NAME);
        return new SessionClientAppwrite(sessionCookie);
      },
      admin: async () => {
        return new AdminClientAppwrite();
      },
      guest: async () => {
        return new BaseClientAppWrite();
      },
    };
  }

  async database() {
    const sessionCookie: RequestCookie | undefined = await getCookie(COOKIE_NAME);
    return new DatabaseClientAppwrite(sessionCookie);
  }

  cache() {
    return RedisClient.getInstance().redisInstance;
  }
}

export const serviceClient = new ServiceClient();
