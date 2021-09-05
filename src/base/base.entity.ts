import { Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @Property({ default: true, name: 'active' })
  active!: boolean;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
