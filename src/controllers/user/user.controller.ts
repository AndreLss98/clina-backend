import { Controller } from '@nestjs/common';
import { BaseController } from '../base.controller';

import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController extends BaseController<User, UserService, CreateUserDto, UpdateUserDto> {
  constructor(private readonly _userService: UserService) {
    super(_userService);
  }
}
