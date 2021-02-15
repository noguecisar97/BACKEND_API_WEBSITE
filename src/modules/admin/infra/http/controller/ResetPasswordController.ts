import { Request, Response } from 'express';
import ResetPasswordEmailService from '@modules/admin/services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordEmailController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const ResetPasswordEmail = container.resolve(ResetPasswordEmailService);

    await ResetPasswordEmail.execute({ token, password });

    return res.status(204).json({ sucess: true, msg: 'password reseted' });
  }
}
