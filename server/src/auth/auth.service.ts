import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
import {SALT} from "./constants";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailVerification} from "./entity/emailVerification.entity";
import {EmailVerificationRepository} from "./repository/emailVerification.repository";
import {ForgotPasswordRepository} from "./repository/forgotPassword.repository";
import {MailerService} from "../mailer/mailer.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(EmailVerification)
        private emailVerificationRepository: EmailVerificationRepository,
        private forgotPasswordRepository: ForgotPasswordRepository,
        private usersService: UsersService,
        private mailerService: MailerService,
        private jwtService: JwtService,
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

    async decryptPassword(password, hash): Promise<boolean|string>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash)
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    async login(email: string, pass: string): Promise<any> {
        try {
            const user = await this.usersService.findOne({where: {email}});

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

    async register(email: string, pass: string){
        if(await this.usersService.findOne({where: {email}})){
            throw new BadRequestException('Sorry username already in use')
        }

        try {
            // Encrypt password
            const password = await this.encryptPassword(pass);

            const user = await this.usersService.create(email, password);
            delete user.password;
            return user;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    async signToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            user: user,
            token: this.jwtService.sign(payload),
        };
    }

    async createEmailToken(email: string){
        const model = await this.emailVerificationRepository.findOne({where: {email: email}});
        const token = Math.random().toString(36).substr(2, 9);

        if(model){
            await this.emailVerificationRepository.updateEntity(model.id, {token: token})
        } else {
            await this.emailVerificationRepository.createEntity({email: email, token: token});
        }
    }

    async verifyEmail(token: string){
        const emailVerification = await this.emailVerificationRepository.findOne({where: {token: token}})

        if(emailVerification && emailVerification.token){
            const user = await this.usersService.findOne({where: {email: emailVerification.email}});

            if(user){
                await this.usersService.update({where: {id: user.id}}, {verified: true})
                return {verified: true, message: 'Account successfully verified'};
            }
        } else {
            throw new ForbiddenException(`Sorry, we couldn't verify your email address`);
        }
    }

    async forgotPassword(email: string){
        const user = await this.usersService.findOne({where: {email: email}})
        if(!user) throw new BadRequestException('User not found');

        await this.createForgotPasswordToken(email);
        await this.mailerService.sendForgotPasswordEmail(email);
    }

    async changePassword(token: string, password: string){
        if(!token) throw new BadRequestException('No token provided');
        const forgotPasswordEntity = await this.forgotPasswordRepository.findOne({where: {token: token}});

        if(forgotPasswordEntity && forgotPasswordEntity.token){
            const user = await this.usersService.findOne({where: {email: forgotPasswordEntity.email}});

            if(user){
                const newPassword = await this.encryptPassword(password);
                await this.forgotPasswordRepository.deleteEntity(token);
                return await this.usersService.update({where: {id: user.id}}, {password: newPassword});
            } else {
                throw new BadRequestException('User not found');
            }
        } else {
            throw new ForbiddenException(`Sorry we couldn't process this request`)
        }
    }

    async createForgotPasswordToken(email: string){
        const token = Math.random().toString(36).substr(2, 9);
        await this.forgotPasswordRepository.createEntity({email: email, token: token});
    }
}
