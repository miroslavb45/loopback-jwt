import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { UserRole } from '../models';
import { UserRoleRepository } from '../repositories';
import { secured, SecuredType } from '../auth';

export class UserRoleControllerController {
  constructor(
    @repository(UserRoleRepository)
    public userRoleRepository: UserRoleRepository,
  ) { }


  @post('/user-roles', {
    responses: {
      '200': {
        description: 'UserRole model instance',
        content: { 'application/json': { schema: { 'x-ts-type': UserRole } } },
      },
    },
  })
  async create(@requestBody() userRole: UserRole): Promise<UserRole> {
    return await this.userRoleRepository.create(userRole);
  }

  @get('/user-roles/count', {
    responses: {
      '200': {
        description: 'UserRole model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserRole)) where?: Where,
  ): Promise<Count> {
    return await this.userRoleRepository.count(where);
  }

  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  @get('/user-roles', {
    responses: {
      '200': {
        description: 'Array of UserRole model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': UserRole } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserRole)) filter?: Filter,
  ): Promise<UserRole[]> {
    console.log(filter);
    return await this.userRoleRepository.find(filter);
  }

  @patch('/user-roles', {
    responses: {
      '200': {
        description: 'UserRole PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() userRole: UserRole,
    @param.query.object('where', getWhereSchemaFor(UserRole)) where?: Where,
  ): Promise<Count> {
    return await this.userRoleRepository.updateAll(userRole, where);
  }

  @get('/user-roles/{id}', {
    responses: {
      '200': {
        description: 'UserRole model instance',
        content: { 'application/json': { schema: { 'x-ts-type': UserRole } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<UserRole> {
    return await this.userRoleRepository.findById(id);
  }

  @patch('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() userRole: UserRole,
  ): Promise<void> {
    await this.userRoleRepository.updateById(id, userRole);
  }

  @put('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userRole: UserRole,
  ): Promise<void> {
    await this.userRoleRepository.replaceById(id, userRole);
  }

  @del('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRoleRepository.deleteById(id);
  }
}
