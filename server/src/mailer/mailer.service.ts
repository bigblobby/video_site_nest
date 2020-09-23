import {ForbiddenException, Injectable} from '@nestjs/common';
import * as nodemailer from "nodemailer";
import {EmailVerificationRepository} from "../auth/repository/emailVerification.repository";
import {ForgotPasswordRepository} from "../auth/repository/forgotPassword.repository";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MailerService {
    constructor(
        private emailVerificationRepository: EmailVerificationRepository,
        private forgotPasswordRepository: ForgotPasswordRepository,
        private config: ConfigService,
    ){}

    async sendForgotPasswordEmail(email: string){
        const entity = await this.forgotPasswordRepository.findOne({where: {email: email}})

        if(entity && entity.token){
            const transporter = nodemailer.createTransport({
                host: this.config.get('MAILER_HOST'),
                port: this.config.get('MAILER_PORT'),
                auth: {
                    user: this.config.get('MAILER_USER'),
                    pass: this.config.get('MAILER_PASSWORD')
                }
            });

            const mailOptions = {
                from: `"Company" ${this.config.get('MAILER_USER')}`,
                to: email,
                subject: 'Forgot password',
                text: 'Forgot password',
                html: 'Hi! <br><br> You forgot your password!<br><br>'+
                    '<a href=http://127.0.0.1:8080/user/forgot-password/'+ entity.token + ' target="_blank">Click here to create a new one</a>'
            };

            const sent = await new Promise<boolean>(async function(resolve, reject) {
                return transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log('Message sent: %s', error);
                        return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });
            })

            return sent;
        } else {
            throw new ForbiddenException()
        }
    }

    async sendEmailVerification(email: string){
        const emailVerification = await this.emailVerificationRepository.findOne({where: {email: email}})

        if(emailVerification && emailVerification.token){
            const transporter = nodemailer.createTransport({
                host: this.config.get('MAILER_HOST'),
                port: this.config.get('MAILER_PORT'),
                auth: {
                    user: this.config.get('MAILER_USER'),
                    pass: this.config.get('MAILER_PASSWORD')
                }
            });

            const mailOptions = {
                from: `"Company" ${this.config.get('MAILER_USER')}`,
                to: email,
                subject: 'Verify Email',
                text: 'Verify Email',
                html: 'Hi! <br><br> Thanks for your registration<br><br>'+
                    '<a href=http://127.0.0.1:8080/user/verify/'+ emailVerification.token + ' target="_blank">Click here to activate your account</a>'
            };

            const sent = await new Promise<boolean>(async function(resolve, reject) {
                return transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log('Message sent: %s', error);
                        return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });
            })

            return sent;
        } else {
            throw new ForbiddenException()
        }
    }
}
