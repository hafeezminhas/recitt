import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnvSchema } from './config/config.schema';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './features/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnvSchema,
    }),
    MailerModule.forRootAsync({
      useFactory: () => {
        const { SENDGRID_API_ID, SENDGRID_API_KEY, SENDGRID_SENDER } =
          process.env;
        return {
          transport: {
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
              user: SENDGRID_API_ID,
              pass: SENDGRID_API_KEY,
            },
          },
          defaults: {
            from: `"No Reply" <${SENDGRID_SENDER}>`,
          },
          template: {
            dir: process.cwd() + '/apps/api/src/app/shared/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    DatabaseModule,

    // Feature Modules
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
