import { Injectable } from '@nestjs/common';
import clientURL from '../../../clientURL/clientURL'
import { OrganizationService } from '../../organization/organization.service';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import EnvVariables from "../../../EnvVariables";

@Injectable()
export class ResetPasswordService {
    constructor (
        private organizationService: OrganizationService,
        private jwtService: JwtService
    ) {}

    async sendMail(email: string) {
        const payload = await this.organizationService.getResetPasswordInfo(email);
        if(!payload) return Promise.reject('the email is not registered');
        const ResetToken = await this.jwtService.sign(payload);
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EnvVariables.MAIL_NAME, //generated by Mailtrap
                pass: EnvVariables.MAIL_PASS //generated by Mailtrap
            }
        });
        const mailOptions = {
            from: EnvVariables.MAIL_NAME,
            to: email,
            subject: 'Reset password link',
            text: clientURL + '/reset/' + ResetToken,
        };
        return transport.sendMail(mailOptions);
    }

    async resetPassword(password: string, email: string) {
        return this.organizationService.resetPassword(password, email);
    }
}

