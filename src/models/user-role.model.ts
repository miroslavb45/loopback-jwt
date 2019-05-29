import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User } from './user.model';
import { Role } from './role.model';

@model({ settings: { strict: false } })
export class UserRole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Role)
  roleId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}
