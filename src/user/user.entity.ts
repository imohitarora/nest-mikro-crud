import {
    Entity,
    Enum,
    PrimaryKey,
    Property
} from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Enum()
  role!: UserRole; // string enum

  @Enum()
  status!: UserStatus; // numeric enum
}

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export const enum UserStatus {
  DISABLED,
  ACTIVE,
}

// or we could reexport OutsideEnum
// export { OutsideEnum } from './OutsideEnum.ts';
