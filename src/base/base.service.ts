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

  async update(entity: T): Promise<any> {
    try {
      console.log('Base Service Update', entity);
      const responseAux: any = await this.genericRepository.findOne(entity);
      if (responseAux == null) throw new NotFoundException('Id does not exist');
      let mergeEntity: any = Object.assign(responseAux, entity);
      await this.genericRepository.persist(mergeEntity);
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
      await this.genericRepository.persistAndFlush(mergeEntity);
      return entity;
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  delete(entity: T) {
    try {
      this.genericRepository.remove(entity);
    } catch (error) {
      Logger.log(error, 'BaseService');
      throw new BadGatewayException(error);
    }
  }

  persist(entity: T) {}
}
