import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      return await this.authService.validateUser({email, password});
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
