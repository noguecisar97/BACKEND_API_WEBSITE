import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteTokensService from '@modules/admin/services/DeleteTokensService';

export default class ForgotPasswordEmailController {
  public async delete(req: Request, res: Response): Promise<void> {
    const deleteTokens = container.resolve(DeleteTokensService);

    await deleteTokens.execute();

    res.status(204).json();
  }
}
