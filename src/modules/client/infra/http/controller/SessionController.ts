import { Request, Response } from 'express';
import AuthenticateClientServer from '@modules/client/services/AuthenticateClientService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const clientSession = container.resolve(AuthenticateClientServer);

    const client = await clientSession.execute({ email, password });

    return res.status(200).json(classToClass(client));
  }
}
