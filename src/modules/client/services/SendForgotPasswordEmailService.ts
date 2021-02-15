import { inject, injectable } from 'tsyringe';
// import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import IClientRepository from '../repositories/IClientRepository';
import IClientTokensRepository from '../infra/typeorm/repositories/ClientTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,
  ) {
    this.clientRepository = clientRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) throw new AppError('User does not exists.');

    const { token } = await this.clientTokensRepository.generate(client.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: client.nome,
        email: client.email,
      },
      subject: '[Wolf] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: client.nome,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
