export interface Environment {
  production: boolean;
  apiPrefix?: string;
  apiMockDelay?: number;
  version: string;
  appName: string;
  credentials: {
    email: string;
    password: string;
  } | null;
  defaultLanguage: string;
  authKey: string;
}
