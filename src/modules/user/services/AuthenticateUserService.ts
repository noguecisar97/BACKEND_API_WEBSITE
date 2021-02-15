import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/User';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IUser {
  User: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    email,
    password,
  }: Pick<User, 'email' | 'password'>): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email.toUpperCase());

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!(password === user.password)) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      User: user,
      token,
    };
  }
}

export default AuthenticateUserService;
