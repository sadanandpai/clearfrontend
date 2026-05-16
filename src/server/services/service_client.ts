import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  AdminClientAppwrite,
  AdminDatabaseClientAppwrite,
  BaseClientAppWrite,
  DatabaseClientAppwrite,
  SessionClientAppwrite,
} from "./appwrite";
import { COOKIE_NAME } from "@/server/config/server.config";
import { getCookie } from "@/server/utils/cookies";
import { Redis } from "@upstash/redis";

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

  adminDatabase() {
    return new AdminDatabaseClientAppwrite();
  }

  cache() {
    return Redis.fromEnv();
  }
}

export const serviceClient = new ServiceClient();
