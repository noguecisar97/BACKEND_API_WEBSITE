import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/typeorm/entities/User';
import IFindUserDTO from '../dtos/IFindUserDto';

export default interface IUserRepository {
  create({
    id,
    nome,
    login,
    password,
    telefone,
    email,
    boleto,
    painel,
    renda,
    dataRenovacao,
    dataInicio,
    updatedAt,
    adminResponsavel,
  }: Omit<User, '_id'>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findOne(id: string, email: string): Promise<User | undefined>;
  find(data: IFindUserDTO): Promise<User[] | undefined>;
  update(
    data: IUpdateUserDTO,
  ): Promise<Omit<User, '_id' | 'adminResponsavel'> | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  findByPhone(telefone: string): Promise<User | undefined>;
  delete(id: string, adminResponsavel: string): Promise<void>;
}
