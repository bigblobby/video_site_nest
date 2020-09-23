import {Controller, Post, Get, Body, Param, Request, UseGuards, InternalServerErrorException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guard/local-auth.guard";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {CreateUserDto} from "../users/dto/CreateUserDto";
import {MailerService} from "../mailer/mailer.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private mailerService: MailerService,
    ){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.signToken(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        const user = await this.authService.register(createUserDto.email, createUserDto.password);

        await this.authService.createEmailToken(createUserDto.email);
        await this.mailerService.sendEmailVerification(createUserDto.email);
        return this.authService.signToken(user);
    }

    @Get('email/verify/:token')
    async verify(@Param('token') token){
        return await this.authService.verifyEmail(token);
    }

    @Get('email/resend-verification/:email')
    async resendVerification(@Param('email') email){
        try {
            await this.authService.createEmailToken(email);
            const isSent = await this.mailerService.sendEmailVerification(email);

            if(isSent){
                return {message: 'Email has been re-sent'};
            }
        } catch (error) {
            throw new InternalServerErrorException('Email has not been sent');
        }
    }

    @Post('user/forgot-password')
    async forgotPassword(@Body('email') email){
        try {
            return await this.authService.forgotPassword(email);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    @Post('user/change-password')
    async changePassword(@Body() body){
        try {
            return await this.authService.changePassword(body.token, body.password);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    @Post('protect')
    @UseGuards(JwtAuthGuard)
    async protect(@Request() req){
        return req.user;
    }
}
