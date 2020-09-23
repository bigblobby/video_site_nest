import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmailVerificationRepository} from "./repository/emailVerification.repository";
import {ConfigModule} from "@nestjs/config";
import {ForgotPasswordRepository} from "./repository/forgotPassword.repository";
import {MailerModule} from "../mailer/mailer.module";

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        MailerModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: jwtConstants.signOptions,
        }),
        TypeOrmModule.forFeature([
            EmailVerificationRepository,
            ForgotPasswordRepository
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [
        TypeOrmModule.forFeature([
            EmailVerificationRepository,
            ForgotPasswordRepository
        ])
    ]
})
export class AuthModule {}
