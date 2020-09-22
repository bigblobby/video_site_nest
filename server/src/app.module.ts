import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "./common/pipes/validation.pipe";
import {Connection} from "typeorm";
import { AuthModule } from './auth/auth.module';
import * as path from "path";
import {ConfigModule} from "nestjs-config";

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config/database.js')),
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
