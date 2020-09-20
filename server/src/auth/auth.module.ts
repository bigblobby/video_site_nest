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

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60000s' },
        }),
        TypeOrmModule.forFeature([EmailVerificationRepository])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
