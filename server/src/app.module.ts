import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import {APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "./common/pipes/validation.pipe";
import {Connection} from "typeorm";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'remote',
        password: 'password',
        database: 'video_site_nest',
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
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
