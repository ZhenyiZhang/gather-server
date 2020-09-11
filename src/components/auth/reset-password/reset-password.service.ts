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
            host: 'gmail',
            auth: {
                type: "OAuth2",
                user: "gather@noted-feat-289220.iam.gserviceaccount.com",
                serviceClient: "100973907777663705041",
                privateKey: "0472f595826ece117bb3deef3b21d067a12fff6d"
            }
        });
        const resetLink = clientURL + '/reset/' + ResetToken + '';
        const mailOptions = {
            from: EnvVariables.MAIL_NAME,
            to: email,
            subject: 'Gather reset password',
            html: "<a href=" + resetLink + "> click on this link to reset password <a/>"
        };
        return transport.sendMail(mailOptions);
    }

    async resetPassword(password: string, email: string) {
        return this.organizationService.resetPassword(password, email);
    }
}


