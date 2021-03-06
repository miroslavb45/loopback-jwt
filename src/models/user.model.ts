import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'Date',
    required: false,
  })
  date_of_birth: Date;

  @property({
    type: 'string',
    required: false,
  })
  first_name: string;

  @property({
    type: 'string',
    required: false,
  })
  last_name: string;



  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
