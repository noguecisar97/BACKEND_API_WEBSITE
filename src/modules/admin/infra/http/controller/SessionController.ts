import { Request, Response } from 'express';
import AuthenticateAdminServer from '@modules/admin/services/AuthenticateAdminService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const adminSession = container.resolve(AuthenticateAdminServer);

    const admin = await adminSession.execute({ email, password });

    return res.status(200).json(classToClass(admin));
  }
}
