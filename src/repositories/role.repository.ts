import {DefaultCrudRepository} from '@loopback/repository';
import {Role} from '../models';
import {MemoryDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: MemoryDbDataSource,
  ) {
    super(Role, dataSource);
  }
}
