import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(id: string, adminResponsavel: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('User not exist.');

    const admin = await this.adminRepository.findById(adminResponsavel);

    if (!admin) throw new AppError('Admin not exist.');

    await this.userRepository.delete(user.id, adminResponsavel);
  }
}

export default DeleteUserService;
