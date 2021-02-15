import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/CreateUserService';
import UpdateUserService from '@modules/user/services/UpdateUserService';
import DeleteUserService from '@modules/user/services/DeleteUserService';
import FindUserService from '@modules/user/services/FindUserService';

interface Query {
  nome: string;
  login: string;
  telefone: string;
  email: string;
  painel: string;
}

export default class UserController {
  public async find(
    req: Request<unknown, unknown, unknown, Query>,
    res: Response,
  ): Promise<Response> {
    const { nome, login, telefone, email, painel } = req.query;

    const findUsers = container.resolve(FindUserService);

    const users = await findUsers.execute({
      nome,
      login,
      telefone,
      email,
      painel,
    });

    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      nome,
      login,
      password,
      telefone,
      email,
      boleto,
      painel,
      renda,
      dataRenovacao,
    } = req.body;

    const userCreate = container.resolve(CreateUserService);

    const user = await userCreate.execute({
      nome,
      login,
      password,
      telefone,
      email,
      boleto,
      painel,
      renda,
      dataRenovacao,
    });

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      nome,
      login,
      password,
      telefone,
      email,
      boleto,
      renda,
      painel,
      dataRenovacao,
    } = req.body;

    const userUpdate = container.resolve(UpdateUserService);

    const user = await userUpdate.execute({
      id,
      nome,
      login,
      password,
      telefone,
      email,
      boleto,
      renda,
      painel,
      dataRenovacao,
    });

    return res.status(200).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const userDelete = container.resolve(DeleteUserService);

    await userDelete.execute(id);

    return res.status(200).json({ admin: 'user deleted!' });
  }
}
