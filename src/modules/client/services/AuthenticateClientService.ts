import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Client from '@modules/client/infra/typeorm/entities/Client';
import authConfig from '@config/auth';
import IClientRepository from '../repositories/IClientRepository';

interface IClient {
  Client: {
    id: string;
    nome: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}
@injectable()
class AuthenticateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    email,
    password,
  }: Pick<Client, 'email' | 'password'>): Promise<IClient> {
    const client = await this.clientRepository.findByEmail(email.toUpperCase());

    if (!password || !client?.password) {
      throw new AppError('Incorrect email/password combination.');
    }

    if (!client) {
      throw new AppError('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, client.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return {
      Client: client,
      token,
    };
  }
}

export default AuthenticateClientService;
