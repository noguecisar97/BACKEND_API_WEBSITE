import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticatedClient';
import ClientController from '../controller/ClientController';

const ClientRoutes = Router();
const clientController = new ClientController();

ClientRoutes.use(ensureAuthenticated);

ClientRoutes.get('/', clientController.find);

ClientRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  clientController.create,
);

ClientRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      email: Joi.string(),
      password: Joi.string(),
    },
  }),
  clientController.uptade,
);

ClientRoutes.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      email: Joi.string().required(),
    },
  }),
  clientController.delete,
);

export default ClientRoutes;
