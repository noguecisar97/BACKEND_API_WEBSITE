import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AdminController from '../controller/AdminController';

import ensureAuthenticated from '../middlewares/ensureAuthenticatedAdmin';

const AdminRoutes = Router();
const adminController = new AdminController();
AdminRoutes.use(ensureAuthenticated);

AdminRoutes.get('/', adminController.find);

AdminRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  adminController.create,
);

AdminRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  adminController.uptade,
);

AdminRoutes.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      email: Joi.string().required(),
    },
  }),
  adminController.delete,
);

export default AdminRoutes;
