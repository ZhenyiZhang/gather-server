import { Controller, Get, Param, Post, Res,  Request, UseGuards, Delete } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {JwtAuthGuard} from './jwtAuthGuard';
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

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteEvent/:eventId')
  async deleteEvent(@Request() req, @Param() param) {
    return this.authService.deleteEvent(req.user.userId,  param.eventId);
  }


  @UseGuards(JwtAuthGuard)
  @Post('/modifyEvent/:eventId')
  async modifyEvent(@Request() req, @Param() param) {
    return this.authService.deleteEvent(req.user.userId,  param.eventId);
  }
}