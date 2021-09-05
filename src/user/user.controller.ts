import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(public _service: UserService) {}

  @Get()
  findAll() {
    return this._service.findAll();
  }

  @Get('/:id')
  findOne(@Res() res, @Param('id') id: number) {
    return this._service.findOne(id);
  }
}
