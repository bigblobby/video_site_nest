import {Controller, Post, Body, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guard/local-auth.guard";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {CreateUserDto} from "../users/dto/CreateUserDto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto.email, createUserDto.password);
    }

    @Post('protect')
    @UseGuards(JwtAuthGuard)
    async protect(@Request() req){
        return req.user;
    }
}
