import ClientToken from '../infra/typeorm/entities/ClientToken';

export default interface IClientTokensRepository {
  generate(userId: string): Promise<ClientToken>;
  findByToken(token: string): Promise<ClientToken | undefined>;
  find(): Promise<ClientToken[]>;
  delete(data: ClientToken): Promise<void>;
}
