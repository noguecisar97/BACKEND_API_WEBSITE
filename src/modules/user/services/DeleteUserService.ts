import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('User not exist.');

    await this.userRepository.delete(user.id);
  }
}

export default DeleteUserService;
