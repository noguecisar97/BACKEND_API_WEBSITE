import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import authConfig from '@config/auth';
import IAdminRepository from '../repositories/IAdminRepository';

interface IAdmin {
  Admin: {
    id: string;
    nome: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}
@injectable()
class AuthenticateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({
    email,
    password,
  }: Pick<Admin, 'email' | 'password'>): Promise<IAdmin> {
    if (!email || !password)
      throw new AppError('Incorrect email/password combination.');

    const admin = await this.adminRepository.findByEmail(email.toUpperCase());

    if (!admin) {
      throw new AppError('Incorrect email/password combination.');
    }

    if (!admin.password)
      throw new AppError('Incorrect email/password combination.');

    const passwordMatched = await compare(password, admin.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) throw new AppError('Erro na chave de criação.');

    const token = sign({}, secret, {
      subject: admin.id,
      expiresIn,
    });

    return {
      Admin: admin,
      token,
    };
  }
}

export default AuthenticateAdminService;
