import { getRepository, Repository } from 'typeorm';

import IClientTokensRepository from '@modules/client/repositories/IClientTokensRepository';

import ClientToken from '@modules/client/infra/typeorm/entities/ClientToken';
import { v4 } from 'uuid';

class ClientTokensRepository implements IClientTokensRepository {
  private ormRepository: Repository<ClientToken>;

  constructor() {
    this.ormRepository = getRepository(ClientToken);
  }

  public async generate(clientId: string): Promise<ClientToken> {
    const clientToken = new ClientToken();

    Object.assign(clientToken, {
      id: v4(),
      token: v4(),
      clientId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.create(clientToken);

    await this.ormRepository.save(clientToken);

    return clientToken;
  }

  public async findByToken(token: string): Promise<ClientToken | undefined> {
    const clientToken = await this.ormRepository.findOne({ token });

    return clientToken;
  }

  public async find(): Promise<ClientToken[]> {
    const clientToken = await this.ormRepository.find();

    return clientToken;
  }

  public async delete(data: ClientToken): Promise<void> {
    await this.ormRepository.delete(data);
  }
}

export default ClientTokensRepository;
