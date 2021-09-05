import { Controller, Get, Param, Res } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseController<User> {
  constructor(public _service: UserService) {
    super(User, _service);
  }
}
