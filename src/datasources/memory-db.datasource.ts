import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './memory-db.datasource.json';

export class MemoryDbDataSource extends juggler.DataSource {
  static dataSourceName = 'memoryDB';

  constructor(
    @inject('datasources.config.memoryDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
