import { DefaultCrudRepository } from '@loopback/repository';
import { UserRole } from '../models';
import { inject } from '@loopback/core';
import { DbDataSource } from '../datasources';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserRole, dataSource);
  }
}
