import { Injectable } from '@nestjs/common';
import clientURL from '../../../clientURL/clientURL'
import { OrganizationService } from '../../organization/organization.service';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import {google} from 'googleapis';
import EnvVariables from "../../../EnvVariables";

@Injectable()
export class ResetPasswordService {
    constructor (
        private organizationService: OrganizationService,
        private jwtService: JwtService
    ) {}

    async sendMail(email: string) {
        /*config google api OAuth*/
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
          EnvVariables.GMAIL_CLIENT_ID, // ClientID
          EnvVariables.GMAIL_CLIENT_SECRET,// Client Secret
          EnvVariables.GMAIL_REDIRECT_URI// Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: EnvVariables.GMAIL_REFRESH_TOKEN
        });
        const accessToken = oauth2Client.getAccessToken()
        /*get email address of the user*/
        const payload = await this.organizationService.getResetPasswordInfo(email);
        if(!payload) return Promise.reject('the email is not registered');
        const ResetToken = await this.jwtService.sign(payload);
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EnvVariables.GMAIL_ADDRESS,
                clientId: EnvVariables.GMAIL_CLIENT_ID,
                clientSecret: EnvVariables.GMAIL_CLIENT_SECRET,
                refreshToken: EnvVariables.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false
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


