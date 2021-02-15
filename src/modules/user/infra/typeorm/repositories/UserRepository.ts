import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/user/dtos/IUpdateUserDTO';
import IFindUserDTO from '@modules/user/dtos/IFindUserDto';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  // find user in the database
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ email });

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ id });

    return findUser;
  }

  public async findOne(id: string, email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        id,
        email,
      },
    });

    return findUser;
  }

  public async find(data: IFindUserDTO): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      where: {
        nome: { $regex: `.*${data.nome}.*` },
        email: { $regex: `.*${data.email}.*` },
        telefone: { $regex: `.*${data.telefone}.*` },
        painel: { $regex: `.*${data.painel}.*` },
        login: { $regex: `.*${data.login}.*` },
      },
    });

    return users;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ login });

    return findUser;
  }

  public async findByPhone(telefone: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ telefone });

    return findUser;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async create({
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
  }: ICreateUserDTO): Promise<User> {
    const createUser = await this.ormRepository.create({
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
    });

    await this.ormRepository.save(createUser);

    return createUser;
  }

  public async update({
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
  }: IUpdateUserDTO): Promise<User | undefined> {
    await this.ormRepository.update(
      { id },
      {
        nome,
        login,
        password,
        telefone,
        email,
        boleto,
        painel,
        renda,
        dataRenovacao,
      },
    );

    const user = await this.ormRepository.findOne({ id });

    return user;
  }
}

export default UserRepository;
