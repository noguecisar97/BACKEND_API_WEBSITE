import { hash, compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import Client from '@modules/client/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
class AlterClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    id,
    nome,
    password,
  }: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>): Promise<
    Client | undefined
  > {
    const clientExist = await this.clientRepository.findById(id);

    if (!clientExist) throw new AppError('client not exist.');

    if (password && clientExist.password) {
      if (password.length < 4) throw new AppError('password is too short');

      if (await !compare(password, clientExist.password)) {
        const passHash = await hash(password, 8);

        await this.clientRepository.updatePassword({
          id,
          password: passHash,
        });
      }
    }

    if (nome) {
      const client = await this.clientRepository.updateName({
        id,
        nome: nome.toUpperCase(),
      });

      delete client?.password;

      return client;
    }

    return clientExist;
  }
}

export default AlterClientService;
