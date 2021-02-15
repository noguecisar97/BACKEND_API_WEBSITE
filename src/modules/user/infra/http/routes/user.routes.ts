import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/admin/infra/http/middlewares/ensureAuthenticatedAdmin';
import UserController from '../controller/UserController';

const UsersRouter = Router();
const userController = new UserController();

UsersRouter.use(ensureAuthenticated);

UsersRouter.get('/', userController.find);

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
      boleto: Joi.string().required(),
      painel: Joi.string().required(),
      renda: Joi.number().required(),
      dataRenovacao: Joi.date().required(),
    },
  }),
  userController.create,
);

UsersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
      boleto: Joi.string().required(),
      painel: Joi.string().required(),
      renda: Joi.number().required(),
      dataRenovacao: Joi.date().required(),
    },
  }),
  userController.update,
);

UsersRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.delete,
);

export default UsersRouter;
