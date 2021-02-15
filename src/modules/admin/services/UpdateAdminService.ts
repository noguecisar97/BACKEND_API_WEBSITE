import { hash, compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import AppError from '@shared/errors/AppError';
import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
class AlterAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({
    id,
    nome,
    email,
    password,
  }: Omit<Admin, '_id' | 'createdAt' | 'updatedAt'>): Promise<
    Admin | undefined
  > {
    const adminExist = await this.adminRepository.findOne(
      id,
      email.toUpperCase(),
    );

    if (!adminExist) throw new AppError('Admin not exist.');

    if (!password || !adminExist.password)
      throw new AppError('Error in reset.');

    if (password.length < 4) throw new AppError('password is too short');

    if (!compare(password, adminExist.password)) {
      const passwordHash = await hash(password, 8);

      const adminUpdate = await this.adminRepository.update(id, {
        nome: nome.toUpperCase(),
        email: email.toUpperCase(),
        password: passwordHash,
      });

      return adminUpdate;
    }

    const passwordH = await hash(password, 8);

    const admin = await this.adminRepository.update(id, {
      nome: nome.toUpperCase(),
      email: email.toUpperCase(),
      password: passwordH,
    });

    return admin;
  }
}

export default AlterAdminService;
