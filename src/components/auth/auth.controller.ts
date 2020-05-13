import { Controller, Get, Body, Post, Res,  Request, UseGuards} from '@nestjs/common';
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
    return await this.authService.getProfile(req.user.userId);
  }
}