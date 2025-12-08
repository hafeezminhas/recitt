import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnvSchema } from './config/config.schema';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnvSchema,
    }),
    DatabaseModule,

    // features modules
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
