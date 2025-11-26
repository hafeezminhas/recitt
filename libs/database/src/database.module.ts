import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';

// Entities
import { UserEntity } from './entities/user.entity';

// Repositories
import { UserRepository } from './repositories/user.repository';

// @Global() makes providers available across the entire consuming app (apps/api)
@Global()
@Module({
  imports: [
    // 1. Load config from .env
    ConfigModule.forFeature(typeOrmConfig),

    // 2. Configure TypeORM connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Retrieve the registered config using the key 'database'
        return configService.get<TypeOrmModuleOptions>('database');
      },
    }),

    // 3. Make Entities available
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserRepository],
  exports: [TypeOrmModule, UserRepository], // Export the UserRepository for use in API controllers/services
})
export class DatabaseModule { }
