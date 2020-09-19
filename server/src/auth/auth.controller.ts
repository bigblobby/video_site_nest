import {Controller, Post, Body, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guard/local-auth.guard";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {CreateUserDto} from "../users/dto/CreateUserDto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.signToken(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        const user = await this.authService.register(createUserDto.email, createUserDto.password);
        return this.authService.signToken(user);
    }

    @Post('protect')
    @UseGuards(JwtAuthGuard)
    async protect(@Request() req){
        return req.user;
    }
}
