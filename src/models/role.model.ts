import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Role extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;
  @property({
    type: 'string',
    required: true,
  })
  description: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}
