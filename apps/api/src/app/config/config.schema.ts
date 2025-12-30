import Joi from 'joi';

export const envSchema = Joi.object({
  // Environment & app
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  GLOBAL_API_PREFIX: Joi.string().default('/api/v1'),

  // Authentication
  JWT_SECRET: Joi.string().min(8).required(),
  JWT_EXPIRATION_TIME: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .default('3600s'),

  // Database
  DB_TYPE: Joi.string()
    .valid('postgres', 'mysql', 'sqlite', 'mariadb', 'mssql')
    .default('postgres'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().truthy('true').falsy('false').default(false),
  DB_LOG_SQL_QUERIES: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(false),

  // Swagger / docs
  SWAGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),
  SWAGGER_TITLE: Joi.string().default('API'),
  SWAGGER_DESCRIPTION: Joi.string().allow('').default(''),
  SWAGGER_VERSION: Joi.string()
    .pattern(/^\d+(?:\.\d+)*$/)
    .default('1.0'),

  // Customer Onboarding
  ACCOUNT_ONBOARDING_COOKIE: Joi.string().required(),
  ACCOUNT_ONBOARDING_SECRET: Joi.string().min(8).required(),
  ACCOUNT_ONBOARDING_EXPIRY: Joi.string(),
  ACCOUNT_ACTIVATION_SECRET: Joi.string().required(),
  ACCOUNT_ACTIVATION_EXPIRY: Joi.string().required(),

  // Sendgrid Config
  SENDGRID_SENDER: Joi.string().email().required(),
  SENDGRID_API_ID: Joi.string().required(),
  SENDGRID_API_KEY: Joi.string().min(8).required(),
}).unknown(true); // allow extra vars if needed

export function validateEnvSchema(config: Record<string, string | undefined>) {
  const { error, value } = envSchema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true, // convert strings to numbers/booleans where possible
  });

  if (error) {
    throw new Error(`Environment config validation error: ${error.message}`);
  }

  return value;
}
