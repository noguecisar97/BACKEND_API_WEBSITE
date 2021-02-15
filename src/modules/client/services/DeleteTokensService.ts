import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IClientTokensRepository from '../repositories/IClientTokensRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,
  ) {}

  public async execute(): Promise<void> {
    const clientTokens = await this.clientTokensRepository.find();

    clientTokens.map(async token => {
      const createdAt = addHours(token.createdAt, 2);
      const validToken = isAfter(Date.now(), createdAt);

      if (validToken) await this.clientTokensRepository.delete(token);
    });
  }
}

export default DeleteAdminService;
