import { inject, injectable } from 'tsyringe';
import Client from '@modules/client/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({ id }: Pick<Client, 'id' | 'email'>): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) throw new AppError('User not exist.');

    await this.clientRepository.delete(client.id);
  }
}

export default DeleteClientService;
