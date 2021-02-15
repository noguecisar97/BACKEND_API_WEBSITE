import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import findClientService from '@modules/client/services/FindClientService';
import DeleteClientService from '@modules/client/services/DeleteClientService';
import UpdateClientService from '@modules/client/services/UpdateClientService';
import CreateClientService from '@modules/client/services/CreateClientService';

interface IQuery {
  nome: string;
  email: string;
}

export default class ClientController {
  public async find(
    req: Request<unknown, unknown, unknown, IQuery>,
    res: Response,
  ): Promise<Response> {
    const { nome, email } = req.query;

    const clientFind = container.resolve(findClientService);

    const clients = await clientFind.execute(nome, email);

    return res.status(200).json(classToClass(clients));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, email, password } = req.body;

    const clientCreate = container.resolve(CreateClientService);

    const client = await clientCreate.execute({ nome, email, password });

    return res.status(200).json(classToClass(client));
  }

  public async uptade(req: Request, res: Response): Promise<Response> {
    const { id, email, nome, password } = req.body;

    const clientUpdate = container.resolve(UpdateClientService);

    const client = await clientUpdate.execute({ id, email, nome, password });

    return res.status(200).json(classToClass(client));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.body;

    const ClientDelete = container.resolve(DeleteClientService);

    await ClientDelete.execute({ id, email });

    return res.status(200).json({ success: true, msg: 'Client Deleted.' });
  }
}
