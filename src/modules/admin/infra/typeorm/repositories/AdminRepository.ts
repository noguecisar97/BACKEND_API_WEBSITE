import { getRepository, Repository } from 'typeorm';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';

import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import ICreateAdminDTO from '@modules/admin/dtos/ICreateAdminDTO';
import IUpdateAdminDTO from '@modules/admin/dtos/IUpdateAdminDTO';

class AdminRepository implements IAdminRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async save(data: Admin): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne({ email });

    return findAdmin;
  }

  public async findById(id: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne({ id });

    return findAdmin;
  }

  public async findOne(id: string, email: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne({ id, email });

    return findAdmin;
  }

  public async find(): Promise<Admin[] | undefined> {
    const findUsers = await this.ormRepository.find();

    return findUsers;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async update(
    id: string,
    { nome, email, password }: IUpdateAdminDTO,
  ): Promise<Admin | undefined> {
    await this.ormRepository.update(
      { id },
      { nome, email, password, updatedAt: new Date() },
    );

    const admin = this.ormRepository.findOne({ id });

    return admin;
  }

  public async create({
    id,
    nome,
    email,
    password,
    createdAt,
    updatedAt,
  }: ICreateAdminDTO): Promise<Admin> {
    const admin = this.ormRepository.create({
      id,
      nome,
      email,
      password,
      createdAt,
      updatedAt,
    });

    await this.ormRepository.save(admin);

    return admin;
  }
}

export default AdminRepository;
