import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  age?: number;
}
