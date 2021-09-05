import { Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { IBaseService } from './ibase.service';
import { Logger } from '@nestjs/common';

export class BaseController<T> {
  type;
  constructor(type: new () => T, private readonly _IBaseService: IBaseService<T>) {
    this.type = type;
  }

  @Get('/')
  async findAll(@Res() res): Promise<T[]> {
    try {
      const results: T[] = await this._IBaseService.findAll();
      return res.status(HttpStatus.OK).json(results);
    } catch (error) {
      Logger.log(error, 'BaseController');
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error. Please try again later.',
      });
    }
  }

  @Get('/:id')
  async findOne(@Res() res, @Param('id') id: number): Promise<T> {
    try {
      let entity = new this.type();
      entity['id'] = id;
      const result: T = await this._IBaseService.findOne(entity);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      Logger.log(error, 'BaseController');
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error. Please check the ID, and try again later.',
      });
    }
  }

  @Post('/')
  async post(@Res() res, @Body() entity: T): Promise<T> {
    try {
      const result: T = await this._IBaseService.save(entity);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      Logger.log(error, 'BaseController');
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error. Please check the BODY request, and try again later.',
      });
    }
  }

  @Put('/:id')
  async put(@Res() res, @Body() entity: T, @Param('id') id: number): Promise<T> {
    try {
      let oldEntity = new this.type();
      oldEntity['id'] = id;
      const result: T = await this._IBaseService.update(oldEntity, entity);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      Logger.log(error, 'BaseController');
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error. Please check the ID or BODY request, and try again later.',
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: number) {
    try {
      let entity = new this.type();
      entity['id'] = id;
      await this._IBaseService.delete(entity);
      return res.status(HttpStatus.NO_CONTENT).json();
    } catch (error) {
      Logger.log(error, 'BaseController');
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error. Please check the ID, and try again later.',
      });
    }
  }
}
