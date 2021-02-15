import { getRepository, Repository } from 'typeorm';

import IAdminTokensRepository from '@modules/admin/repositories/IAdminTokensRepository';

import AdminToken from '@modules/admin/infra/typeorm/entities/AdminToken';
import { v4 } from 'uuid';

class AdminTokensRepository implements IAdminTokensRepository {
  private ormRepository: Repository<AdminToken>;

  constructor() {
    this.ormRepository = getRepository(AdminToken);
  }

  public async generate(adminId: string): Promise<AdminToken> {
    const adminToken = new AdminToken();

    Object.assign(adminToken, {
      id: v4(),
      token: v4(),
      adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.create(adminToken);

    await this.ormRepository.save(adminToken);

    return adminToken;
  }

  public async findByToken(token: string): Promise<AdminToken | undefined> {
    const adminToken = await this.ormRepository.findOne({ token });

    return adminToken;
  }

  public async find(): Promise<AdminToken[]> {
    const adminToken = await this.ormRepository.find();

    return adminToken;
  }

  public async delete(data: AdminToken): Promise<void> {
    await this.ormRepository.delete(data);
  }
}

export default AdminTokensRepository;
