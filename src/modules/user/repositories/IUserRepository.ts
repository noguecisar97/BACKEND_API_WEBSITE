import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/typeorm/entities/User';
import ICreateUser from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDto';

export default interface IUserRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findOne(id: string, email: string): Promise<User | undefined>;
  find(data: IFindUserDTO): Promise<User[] | undefined>;
  update(data: IUpdateUserDTO): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  findByPhone(telefone: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}
