import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import Client from '@modules/client/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

interface IClient {
  id: string;
  nome: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    email,
    password,
    nome,
  }: Omit<Client, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<IClient> {
    const clientExist = await this.clientRepository.findByEmail(
      email.toUpperCase(),
    );

    if (clientExist)
      throw new AppError('Already exist client with this email.');

    if (!password) throw new AppError('password is too short');

    if (password.length < 4) throw new AppError('password is too short');

    const passwordHash = await hash(password, 8);

    const client = await this.clientRepository.create({
      id: v4(),
      nome: nome.toUpperCase(),
      email: email.toUpperCase(),
      password: passwordHash,
    });

    return client;
  }
}

export default CreateClientService;
