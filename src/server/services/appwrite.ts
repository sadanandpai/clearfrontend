import "server-only";

import { Client, Account, ID, OAuthProvider } from "node-appwrite";
import { COOKIE_NAME } from "@/server/config/server.config";
import { getCookie } from "@/server/utils/cookies";

const oAuthProviders = {
  Google: OAuthProvider.Google,
  Github: OAuthProvider.Github,
};

export type oAuthProvidersType = keyof typeof oAuthProviders;

export function getUniqueID() {
  return ID.unique();
}

export class AppWrite {
  clientInstance;

  oAuthProviders = {
    Google: OAuthProvider.Google,
    Github: OAuthProvider.Github,
  };

  constructor() {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_APPWRITE_PROJECT;

    if (!endpoint || !project) {
      throw new Error("Appwrite endpoint, project not provided");
    }

    this.clientInstance = new Client()
      .setEndpoint(endpoint)
      .setProject(project)

  }

  async createSession() {
    const sessionCookie = await getCookie(COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      throw new Error("No session");
    }

    let sessionClient = this.clientInstance.setSession(sessionCookie.value)

    return {
      get account() {
        return new Account(sessionClient);
      },
      get client() {
        return sessionClient;
      },
    }
  }

  createAdmin() {
    const apiKey = process.env.NEXT_APPWRITE_KEY
    if (
      !apiKey
    ) {
      throw new Error("Appwrite key not provided");
    }

    let adminClient = this.clientInstance.setKey(apiKey);

    return {
      get account() {
        return new Account(adminClient);
      },
      get client() {
        return adminClient;
      },
    };
  }

  getOAuthProvider(provider:keyof typeof this.oAuthProviders) {

    return this.oAuthProviders[provider];

  }

  get account() {
    return new Account(this.clientInstance);
  }

  get client() {
    return this.clientInstance;
  }
}

