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
import { ConfigModule } from "nestjs-config";
// import { ConfigModule as ConfigModuleCore } from "@nestjs/config";
import { MailerModule } from './mailer/mailer.module';
import { MediaModule } from './media/media.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
    imports: [
        // ConfigModuleCore.forRoot({
        //     isGlobal: true
        // }),
        ConfigModule.load(path.resolve(__dirname, 'config/database.js')),
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        MailerModule,
        MediaModule,
        CloudinaryModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
