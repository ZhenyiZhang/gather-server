import { Controller, Get, Body, Post, Res,  Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {JwtAuthGuard} from './jwtAuthGuard';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user) ;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}