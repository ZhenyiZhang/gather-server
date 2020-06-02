import {ResetPasswordService} from "./reset-password.service";
import {AuthGuard} from '@nestjs/passport';
import { Controller, Post, Res,  Request, UseGuards, Body } from '@nestjs/common';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private resetPasswordService: ResetPasswordService) {}

    @Post('/request')
    sendMail(@Request() req, @Res() res, @Body() body) {
        this.resetPasswordService.sendMail(body.email)
            .then(result => {res.status(200).send(result);})
            .catch(err => {
                res.statusMessage = err;
                res.status(403).end();});
    }

    @UseGuards(AuthGuard('passwordReset'))
    @Post('/reset')
    resetPassword(@Request() req, @Res() res, @Body() body) {
        this.resetPasswordService.resetPassword(body.password, req.user.email)
            .then(() => {res.status(200).send('Password is Changed')})
            .catch(err => {res.status(400).send(err)});
    }
}
