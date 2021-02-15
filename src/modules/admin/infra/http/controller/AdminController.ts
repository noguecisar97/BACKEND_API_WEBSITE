import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DeleteAdminService from '@modules/admin/services/DeleteAdminService';
import UpdateAdminService from '@modules/admin/services/UpdateAdminService';
import CreateAdminService from '@modules/admin/services/CreateAdminService';
import FindAdminService from '@modules/admin/services/FindAdminsService';

export default class AdminController {
  public async find(req: Request, res: Response): Promise<Response> {
    const adminFind = container.resolve(FindAdminService);

    const admins = await adminFind.execute();

    return res.status(200).json(classToClass(admins));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, email, password } = req.body;

    const adminCreate = container.resolve(CreateAdminService);

    const admin = await adminCreate.execute({ nome, email, password });

    return res.status(200).json(classToClass(admin));
  }

  public async uptade(req: Request, res: Response): Promise<Response> {
    const { id, email, nome, password } = req.body;

    const adminUpdate = container.resolve(UpdateAdminService);

    const admin = await adminUpdate.execute({ id, email, nome, password });

    return res.status(200).json(classToClass(admin));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.body;

    const adminDelete = container.resolve(DeleteAdminService);

    await adminDelete.execute({ id, email });

    return res.status(200).json({ success: true, msg: 'Admin Deleted.' });
  }
}
