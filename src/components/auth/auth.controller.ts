import { Controller, Put ,Get, Param, Post, Res,  Request, UseGuards, Delete, Body } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req, @Res() res) {
    this.authService.login(req.user)
        .then(user => {res.send(user)})
        .catch(err => {
          res.statusMessage = err;
          res.status(403).end();});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/logout')
  async logOut(@Request() req, @Res() res) {
    this.authService.logout(req.user.userId)
        .then(() => {res.status(200).send('user logged out')})
        .catch(err => {res.status(403).send(err);})
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:eventId')
  async deleteEvent(@Request() req, @Param() param) {
    return this.authService.deleteEvent(req.user.userId,  param.eventId);
  }


  @UseGuards(AuthGuard('jwt'))
  @Put('/:eventId')
  async modifyEvent(@Request() req, @Param() param, @Body() eventUpdateData) {
    return this.authService.updateEvent(req.user.userId,  param.eventId, eventUpdateData);
  }
}