import { StateModule } from './state/state.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { UserEntity } from './user/entities/user.entity';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { StateEntity } from './state/entities/state.entity';
import { CityEntity } from './city/entities/city.entity';
import { AddressEntity } from './address/entities/address.entity';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    StateModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [UserEntity, StateEntity, CityEntity, AddressEntity],
      migrations: [`${ __dirname }/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    CityModule,
    AddressModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
