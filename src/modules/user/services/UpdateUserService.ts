import User from '@modules/user/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    id,
    nome,
    login,
    password,
    telefone,
    email,
    boleto,
    renda,
    painel,
    dataRenovacao,
  }: Omit<
    User,
    '_id' | 'dataInicio' | 'updatedAt' | 'adminResponsavel'
  >): Promise<User | undefined> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) throw new AppError('User not exist.');

    if (userExist.login !== login) {
      const userByLogin = await this.userRepository.findByLogin(login);

      if (userByLogin) throw new AppError('Login already in use', 401);
    }

    await this.userRepository.update({
      id,
      nome: nome.toUpperCase(),
      login,
      password,
      telefone,
      email: email.toUpperCase(),
      boleto,
      renda,
      painel: painel.toUpperCase(),
      dataRenovacao: new Date(dataRenovacao),
    });

    const findUser = await this.userRepository.findById(id);

    return findUser;
  }
}

export default UpdateUserService;
