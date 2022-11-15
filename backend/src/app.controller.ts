import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1')
export class AppController {
  constructor() {}
/*
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testjwt')
  async testjwt(@Request() request) {
    return 'Hello';
  }
  */
}
