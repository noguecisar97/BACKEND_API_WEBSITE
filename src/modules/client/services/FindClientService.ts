import { inject, injectable } from 'tsyringe';
import Client from '@modules/client/infra/typeorm/entities/Client';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
class FindAdminService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute(
    nome: string,
    email: string,
  ): Promise<Client[] | undefined> {
    const clients = await this.clientRepository.find({
      nome: nome ? nome.toUpperCase() : '',
      email: email ? email.toUpperCase() : '',
    });

    return clients;
  }
}

export default FindAdminService;
