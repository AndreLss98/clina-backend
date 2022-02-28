import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../shared/guards/local-auth.guard';

import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly _authService: AuthService
  ) { }

  @Post()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this._authService.login(req.user);
  }
}
