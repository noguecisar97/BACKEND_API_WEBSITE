import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IUser {
  email: string;
  painel: string;
  login: string;
  nome: string;
  telefone: string;
  adminResponsavel: string;
}

@injectable()
class FindUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    email,
    painel,
    login,
    nome,
    telefone,
    adminResponsavel,
  }: IUser): Promise<User[] | undefined> {
    const data = {
      email: email ? email.toUpperCase() : '',
      painel: painel ? painel.toUpperCase() : '',
      login: login || '',
      nome: nome ? nome.toUpperCase() : '',
      telefone: telefone ? telefone.toUpperCase() : '',
      adminResponsavel,
    };

    const users = await this.userRepository.find(data);

    return users;
  }
}

export default FindUserService;
