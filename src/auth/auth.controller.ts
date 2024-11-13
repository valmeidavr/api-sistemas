import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body('userId') userId: number, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(userId, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('permissions/:userId')
  async getUserPermissions(@Param('userId') userId: number) {
    return this.authService.getUserPermissions(userId);
  }
}
