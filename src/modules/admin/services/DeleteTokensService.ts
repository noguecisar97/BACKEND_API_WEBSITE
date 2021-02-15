import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IAdminTokensRepository from '../repositories/IAdminTokensRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('AdminTokensRepository')
    private adminTokensRepository: IAdminTokensRepository,
  ) {}

  public async execute(): Promise<void> {
    const adminTokens = await this.adminTokensRepository.find();

    adminTokens.map(async token => {
      const createdAt = addHours(token.createdAt, 2);
      const validToken = isAfter(Date.now(), createdAt);

      if (validToken) await this.adminTokensRepository.delete(token);
    });
  }
}

export default DeleteAdminService;
