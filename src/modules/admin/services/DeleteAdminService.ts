import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import AppError from '@shared/errors/AppError';
import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({
    id,
    email,
  }: Pick<Admin, 'id' | 'email'>): Promise<void> {
    const admin = await this.adminRepository.findOne(id, email);

    if (!admin) throw new AppError('User not exist.');

    await this.adminRepository.delete(admin.id);
  }
}

export default DeleteAdminService;
