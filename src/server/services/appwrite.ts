import 'server-only';

import { Client, Account, ID, OAuthProvider, Databases, Query } from 'node-appwrite';
import { COOKIE_NAME } from '@/server/config/server.config';
import { getCookie } from '@/server/utils/cookies';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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
  endpoint: string = '';
  project: string = '';
  protected static instance: BaseClientAppWrite | null = null;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '';
    this.project = process.env.NEXT_APPWRITE_PROJECT ?? '';

    if (!this.endpoint || !this.project) {
      throw new Error('Appwrite endpoint, project not provided');
    }
  }

  get client() {
    return new Client().setEndpoint(this.endpoint).setProject(this.project);
  }

  get account() {
    return new Account(this.client);
  }

  static async getInstance() {
    if (!BaseClientAppWrite.instance) {
      BaseClientAppWrite.instance = new BaseClientAppWrite();
    }
    return BaseClientAppWrite.instance;
  }
}

export class SessionClientAppwrite extends BaseClientAppWrite {
  protected static instance: SessionClientAppwrite | null = null;
  session;

  constructor(session: RequestCookie | undefined) {
    super();
    if (!session?.value) {
      throw new Error('No session');
    }
    this.session = session;
  }

  get client() {
    return super.client.setSession(this.session.value);
  }

  get account() {
    return new Account(this.client);
  }

  public static async getInstance() {
    if (!SessionClientAppwrite.instance) {
      const sessionCookie: RequestCookie | undefined = await getCookie(COOKIE_NAME);

      SessionClientAppwrite.instance = new SessionClientAppwrite(sessionCookie);
    }
    return SessionClientAppwrite.instance;
  }
}

export class DatabaseClientAppwrite extends SessionClientAppwrite {
  protected static instance: DatabaseClientAppwrite | null = null;

  public static async getInstance() {
    if (!DatabaseClientAppwrite.instance) {
      const sessionInstance = await SessionClientAppwrite.getInstance();
      DatabaseClientAppwrite.instance = new DatabaseClientAppwrite(sessionInstance.session);
    }
    return DatabaseClientAppwrite.instance;
  }

  get databases() {
    return new Databases(super.client);
  }

  get Query() {
    return Query;
  }
}

export class AdminClientAppwrite extends BaseClientAppWrite {
  apiKey: string = '';
  protected static instance: AdminClientAppwrite | null = null;

  constructor() {
    super();
    this.apiKey = process.env.NEXT_APPWRITE_KEY ?? '';
    if (!this.apiKey) {
      throw new Error('Appwrite key not provided');
    }
  }

  public static async getInstance() {
    if (!AdminClientAppwrite.instance) {
      AdminClientAppwrite.instance = new AdminClientAppwrite();
    }
    return AdminClientAppwrite.instance;
  }

  get client() {
    return super.client.setKey(this.apiKey);
  }

  get account() {
    return new Account(this.client);
  }
}
