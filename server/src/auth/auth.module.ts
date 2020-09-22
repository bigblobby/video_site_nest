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

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60000s' },
        }),
        TypeOrmModule.forFeature([EmailVerificationRepository, ForgotPasswordRepository])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
