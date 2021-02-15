import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import AppError from '@shared/errors/AppError';
import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({
    email,
    password,
    nome,
  }: Omit<Admin, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Admin> {
    const adminExist = await this.adminRepository.findByEmail(
      email.toUpperCase(),
    );

    if (!password) throw new AppError('Password is too short');

    if (adminExist) throw new AppError('Already exist admin with this email.');

    if (password.length < 4) throw new AppError('Password is too short');

    const passwordHash = await hash(password, 8);

    const admin = await this.adminRepository.create({
      id: v4(),
      nome: nome.toUpperCase(),
      email: email.toUpperCase(),
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return admin;
  }
}

export default CreateAdminService;
