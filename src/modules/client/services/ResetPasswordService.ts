import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';
import IClientTokensRepository from '../infra/typeorm/repositories/ClientTokensRepository';
import IHashProvider from '../provider/IHashPassword';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const clientToken = await this.clientTokensRepository.findByToken(token);

    if (!clientToken) throw new AppError('Client token does not exists');

    const client = await this.clientRepository.findById(clientToken?.clientId);

    if (!client) throw new AppError('Client does not exists');

    const createdAt = addHours(clientToken.createdAt, 2);
    const validToken = isAfter(Date.now(), createdAt);

    if (validToken) throw new AppError('Token expired.');

    const hash = new IHashProvider();

    client.password = await hash.generate(password);

    await this.clientRepository.save(client);
  }
}

export default ResetPasswordService;
