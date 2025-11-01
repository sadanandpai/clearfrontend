import "server-only";

import { Client, Account, ID, OAuthProvider, Databases, Query } from "node-appwrite";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const OAuthProviders = {
  Google: OAuthProvider.Google,
  Github: OAuthProvider.Github,
};

export type oAuthProvidersType = keyof typeof OAuthProviders;

export const getOAuthProvider = (provider: oAuthProvidersType) => {
  return OAuthProviders[provider];
};

export function getUniqueID() {
  return ID.unique();
}

export class BaseClientAppWrite {
  endpoint: string = "";
  project: string = "";

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "";
    this.project = process.env.NEXT_APPWRITE_PROJECT ?? "";

    if (!this.endpoint || !this.project) {
      throw new Error("Appwrite endpoint, project not provided");
    }
  }

  get client() {
    return new Client().setEndpoint(this.endpoint).setProject(this.project);
  }

  get account() {
    return new Account(this.client);
  }

}

export class SessionClientAppwrite extends BaseClientAppWrite {
  session;

  constructor(session: RequestCookie | undefined) {
    super();
    if (!session?.value) {
      throw new Error("No session");
    }
    this.session = session;
  }

  get client() {
    return super.client.setSession(this.session.value);
  }

  get account() {
    return new Account(this.client);
  }
}

export class DatabaseClientAppwrite extends SessionClientAppwrite {

  get databases() {
    return new Databases(super.client);
  }

  get Query() {
    return Query;
  }
}

export class AdminClientAppwrite extends BaseClientAppWrite {
  apiKey: string = "";

  constructor() {
    super();
    this.apiKey = process.env.NEXT_APPWRITE_KEY ?? "";
    if (!this.apiKey) {
      throw new Error("Appwrite key not provided");
    }
  }


  get client() {
    return super.client.setKey(this.apiKey);
  }

  get account() {
    return new Account(this.client);
  }
}
