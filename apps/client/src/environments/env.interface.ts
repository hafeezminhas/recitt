export interface Environment {
  production: boolean;
  apiPrefix?: string;
  apiMockDelay?: number;
  version: string;
  appName: string;
  credentials: {
    username: string;
    password: string;
  } | null;
  defaultLanguage: string;
  authKey: string;
}
