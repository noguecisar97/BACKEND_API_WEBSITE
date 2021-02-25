import { v4 } from 'uuid';
import { injectable, inject } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IClientRepository from '@modules/client/repositories/IClientRepository';
import { hash } from 'bcryptjs';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    nome,
    login,
    password,
    telefone,
    email,
    boleto,
    renda,
    painel,
    dataRenovacao,
    adminResponsavel,
  }: Omit<User, 'id' | '_id' | 'dataInicio' | 'updatedAt'>): Promise<User> {
    const userExistLogin = await this.userRepository.findByLogin(login);

    if (userExistLogin)
      throw new AppError('Already exist user with this login!');

    const user = await this.userRepository.create({
      id: v4(),
      nome: nome.toUpperCase(),
      login,
      password,
      telefone,
      email: email.toUpperCase(),
      boleto,
      painel: painel.toUpperCase(),
      renda,
      dataRenovacao: new Date(dataRenovacao),
      adminResponsavel,
      dataInicio: new Date(),
      updatedAt: new Date(),
    });

    const clientAccount = await this.clientRepository.findByEmail(user.email);

    if (!clientAccount) {
      const passwordHash = await hash(user.password, 8);

      await this.clientRepository.create({
        id: v4(),
        nome: user.nome.toUpperCase(),
        email: user.email.toUpperCase(),
        password: passwordHash,
      });
    }

    return user;
  }
}

export default CreateUserService;
