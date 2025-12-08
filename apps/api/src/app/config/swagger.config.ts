import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const { API_NAME, API_VERSION, API_HOST, API_PORT, GLOBAL_API_PREFIX } =
    process.env;
  const config = new DocumentBuilder()
    .setTitle(API_NAME)
    .setDescription(`${API_NAME} API Documentation`)
    .setVersion(API_VERSION)
    .setContact(
      API_NAME,
      `http://${API_HOST}:${API_PORT}/${GLOBAL_API_PREFIX}`,
      'support@recitt.com'
    )
    .addBearerAuth() // if using JWT
    .build();

  try {
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    const swaggerPath = `${GLOBAL_API_PREFIX}/documentation`;

    SwaggerModule.setup(swaggerPath, app, documentFactory, {
      swaggerOptions: {
        persistAuthorization: true, // keeps token between page reloads
      },
    });
  } catch (err) {
    console.error('Error setting up Swagger:', err);
  }
}
