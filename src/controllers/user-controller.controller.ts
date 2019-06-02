import { post, requestBody, HttpErrors } from '@loopback/rest';
import { User, UserRole } from '../models';
import { UserRepository, UserRoleRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { Credentials, JWT_SECRET } from '../auth';
import { promisify } from 'util';

const { sign } = require('jsonwebtoken');
const signAsync = promisify(sign);
const bcrypt = require('bcrypt');

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository) private userRoleRepository: UserRoleRepository,
  ) { }

  @post('/login', {
    responses: {
      '200': {
        description: 'Successful login',
        content: { 'application/json': { schema: { 'x-ts-type': {} } } },
      },
    },
  })
  async login(@requestBody() credentials: Credentials) {
    let user;
    if (credentials.username.indexOf('\@') > 0) {
      user = await this.userRepository.findOne({ where: { email: credentials.username } });
    } else {
      user = await this.userRepository.findOne({ where: { username: credentials.username } });
    }

    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');
    const isPasswordMatched = bcrypt.compareSync(credentials.password, user.password); // true

    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = credentials.username === undefined ? { email: credentials.email } : { username: credentials.username };
    const token = await signAsync(tokenObject, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 3 }); //3 day expire
    const roles = await this.userRoleRepository.find({ where: { userId: user.id } });
    const { id, email, username } = user;

    return {
      token,
      id: id as string,
      email,
      username,
      roles: roles.map(r => r.roleId)
    };
  }

  @post('/register', {
    responses: {
      '200': {
        description: 'Successful registration',
      },
    },
  })
  async register(@requestBody() credentials: Credentials) {
    const user = await this.userRepository.findOne({ where: { username: credentials.username } });

    if (user === null) {
      var hashedPassword = bcrypt.hashSync(credentials.password, 10);

      let newUser: User = new User({ username: credentials.username, password: hashedPassword, first_name: credentials.first_name, last_name: credentials.last_name, email: credentials.email });
      newUser = await this.userRepository.create(newUser);
      let newUserRole: UserRole = new UserRole({ userId: newUser.id, roleId: "USER" });
      this.userRoleRepository.create(newUserRole);

    } else {
      throw new HttpErrors.NotAcceptable('User already exists!');
    }

  }
}
