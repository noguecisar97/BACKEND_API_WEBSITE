import AdminToken from '../infra/typeorm/entities/AdminToken';

export default interface IAdminTokensRepository {
  generate(userId: string): Promise<AdminToken>;
  findByToken(token: string): Promise<AdminToken | undefined>;
  find(): Promise<AdminToken[]>;
  delete(data: AdminToken): Promise<void>;
}
