import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/admin/services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

export default class ForgotPasswordEmailController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const SendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await SendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
