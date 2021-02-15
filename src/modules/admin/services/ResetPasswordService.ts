import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAdminRepository from '../repositories/IAdminRepository';
import IAdminTokensRepository from '../infra/typeorm/repositories/AdminTokensRepository';
import IHashProvider from '../provider/IHashPassword';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('AdminTokensRepository')
    private adminTokensRepository: IAdminTokensRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const adminToken = await this.adminTokensRepository.findByToken(token);

    if (!adminToken) throw new AppError('Admin token does not exists');

    const { adminId } = adminToken;

    const admin = await this.adminRepository.findById(adminId);

    const createdAt = addHours(adminToken.createdAt, 2);
    const validToken = isAfter(Date.now(), createdAt);

    if (!admin) throw new AppError('Admin does not exists');
    if (validToken) throw new AppError('Token expired.');

    const hash = new IHashProvider();

    admin.password = await hash.generate(password);

    await this.adminRepository.save(admin);
  }
}

export default ResetPasswordService;
