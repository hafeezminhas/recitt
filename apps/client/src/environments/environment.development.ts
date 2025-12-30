import { Environment } from './env.interface';

export const environment: Environment = {
  production: false,
  apiPrefix: '/api',
  apiMockDelay: 500, // 500ms delay for mock API responses
  version: '1.0.0',
  appName: 'Recitt',
  credentials: {
    email: 'usman@test.com',
    password: 'Pakistan123',
  },
  defaultLanguage: 'en',
  authKey: 'xapi-key',
};
