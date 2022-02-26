import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare } from 'bcrypt'

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService
  ) { }

  async validateUser(loginDto: {email: string, password: string}): Promise<User> {
    const user = await this._userService.getByEmail(loginDto.email);
    if (user && await compare(loginDto.password, user.password))
      return user
  }
}
