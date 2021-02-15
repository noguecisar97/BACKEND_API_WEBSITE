import { Router } from 'express';
import TokenController from '../controller/TokenController';

const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.delete('/', tokenController.delete);

export default tokenRouter;
