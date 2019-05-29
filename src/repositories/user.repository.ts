import { DefaultCrudRepository } from '@loopback/repository';
import { User } from '../models';
import { inject } from '@loopback/core';
import { DbDataSource } from '../datasources';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }
}
