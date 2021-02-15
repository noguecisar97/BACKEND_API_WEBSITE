import { inject, injectable } from 'tsyringe';
// import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import IAdminRepository from '../repositories/IAdminRepository';
import IAdminTokensRepository from '../infra/typeorm/repositories/AdminTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('AdminTokensRepository')
    private adminTokensRepository: IAdminTokensRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) throw new AppError('User does not exists.');

    const { token } = await this.adminTokensRepository.generate(admin.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: admin.nome,
        email: admin.email,
      },
      subject: '[Wolf] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: admin.nome,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
