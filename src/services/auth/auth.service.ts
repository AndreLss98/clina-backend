import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { LoginPayload } from '../../shared/models/login-payload.model';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService
  ) { }

  async validateUser(loginDto: {email: string, password: string}): Promise<User> {
    const user = await this._userService.getByEmail(loginDto.email);
    if (user && await compare(loginDto.password, user.password))
      return user
  }

  login(user: User): {access_token: string} {
    const payload: LoginPayload = {
      email: user.email,
      sub: user.id
    }

    return {
      access_token: this._jwtService.sign(payload)
    };
  }
}
