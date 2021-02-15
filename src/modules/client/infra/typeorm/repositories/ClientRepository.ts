import { getRepository, Repository } from 'typeorm';

import IClientRepository from '@modules/client/repositories/IClientRepository';

import Client from '@modules/client/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/client/dtos/ICreateClientDTO';

interface IUpdPass {
  id: string;
  password: string;
}
interface IUpdName {
  id: string;
  nome: string;
}
interface IFind {
  nome: string;
  email: string;
}

class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const findClient = await this.ormRepository.findOne({ email });

    return findClient;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const findClient = await this.ormRepository.findOne({ id });

    return findClient;
  }

  public async find({ nome, email }: IFind): Promise<Client[] | undefined> {
    const findClients = this.ormRepository.find({
      where: {
        nome: { $regex: `.*${nome}.*` },
        email: { $regex: `.*${email}.*` },
      },
    });

    return findClients;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async updatePassword({
    id,
    password,
  }: IUpdPass): Promise<Client | undefined> {
    await this.ormRepository.update(
      { id },
      { password, updatedAt: new Date() },
    );

    const client = this.ormRepository.findOne({ id });

    return client;
  }

  public async updateName({ id, nome }: IUpdName): Promise<Client | undefined> {
    await this.ormRepository.update({ id }, { nome, updatedAt: new Date() });

    const client = this.ormRepository.findOne({ id });

    return client;
  }

  public async save(data: Client): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async create({
    id,
    nome,
    email,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      id,
      nome,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.save(client);

    return client;
  }
}

export default ClientRepository;
