import {BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
import {SALT} from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async encryptPassword(password: string): Promise<string>{
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, SALT)
                .then(hash => {
                    resolve(hash);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    async decryptPassword(password, hash){
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash)
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    async validateUser(username: string, pass: string): Promise<any> {
        try {
            const user = await this.usersService.findOne(username);

            // Decrypt password
            if(await this.decryptPassword(pass, user.password)) {
                const { password, ...result } = user;
                return result;
            }

            return null;

        } catch (e) {
            throw new BadRequestException('Sorry no user found')
        }
    }

    async register(username: string, pass: string){
        if(await this.usersService.findOne(username)){
            throw new BadRequestException('Sorry username already in use')
        }

        try {
            // Encrypt password
            const password = await this.encryptPassword(pass);

            const user = await this.usersService.create(username, password);
            const payload = { username: user.username, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (e) {
            throw new InternalServerErrorException();
        }

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
