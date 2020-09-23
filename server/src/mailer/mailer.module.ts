import { Module } from '@nestjs/common';
import {MailerService} from "./mailer.service";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmailVerificationRepository} from "../auth/repository/emailVerification.repository";
import {ForgotPasswordRepository} from "../auth/repository/forgotPassword.repository";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([
            EmailVerificationRepository,
            ForgotPasswordRepository
        ])
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule {}
