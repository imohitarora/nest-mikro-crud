import { EntityRepository } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';

import { Injectable, BadGatewayException, NotFoundException } from '@nestjs/common';
import { IBaseService } from './ibase.service';

@Injectable()
export abstract class BaseService<T> implements IBaseService<T> {
  constructor(private readonly genericRepository: EntityRepository<T>) {}

  findAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.genericRepository.findAll();
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  findOne(entity: T): Promise<T> {
    try {
      return <Promise<T>>this.genericRepository.findOne(entity);
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  async update(oldEntity: T, entity: T): Promise<any> {
    try {
      console.log('Base Service Update', entity);
      const responseAux: any = await this.findOne(oldEntity);
      if (responseAux == null) throw new NotFoundException('Id does not exist');
      let mergeEntity = Object.assign(responseAux, entity);
      await this.genericRepository.persistAndFlush(mergeEntity);
      return 'response';
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  async save(entity: T): Promise<T> {
    try {
      console.log('Saving entity');
      let mergeEntity = await this.genericRepository.create(entity);
      let resp = await this.genericRepository.persistAndFlush(mergeEntity);
      console.log('Saved entity', resp);
      return entity;
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  async delete(entity: T) {
    console.log('delete');
    try {
      await this.genericRepository.removeAndFlush(entity);
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }
}
