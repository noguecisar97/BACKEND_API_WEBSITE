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

    const { id } = req.admin;

    const adminResponsavel = id;

    const findUsers = container.resolve(FindUserService);

    const users = await findUsers.execute({
      nome,
      login,
      telefone,
      email,
      painel,
      adminResponsavel,
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

    const { id } = req.admin;

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
      adminResponsavel: id,
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
    const { id: ID } = req.body;

    const { id } = req.admin;

    const userDelete = container.resolve(DeleteUserService);

    await userDelete.execute(ID, id);

    return res.status(200).json({ admin: 'user deleted!' });
  }
}
