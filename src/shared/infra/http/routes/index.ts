import { Router } from 'express';
import AdminRoutes from '@modules/admin/infra/http/routes/admin.routes';
import usersRoutes from '@modules/user/infra/http/routes/user.routes';
import clientRoutes from '@modules/client/infra/http/routes/client.routes';

import passwordAdminRoutes from '@modules/admin/infra/http/routes/password.routes';
import passwordClientRoutes from '@modules/client/infra/http/routes/password.routes';

import sessionsAdminRoutes from '@modules/admin/infra/http/routes/sessions.routes';
import sessionsCLientRoutes from '@modules/client/infra/http/routes/sessions.routes';

import TokensAdminRoutes from '@modules/admin/infra/http/routes/token.routes';
import TokensClientRoutes from '@modules/client/infra/http/routes/token.routes';

const routes = Router();

routes.use('/v2/client', clientRoutes);
routes.use('/v2/admin', AdminRoutes);
routes.use('/v1/users', usersRoutes);

routes.use('/password/admin', passwordAdminRoutes);
routes.use('/password/client', passwordClientRoutes);

routes.use('/sessions/admin', sessionsAdminRoutes);
routes.use('/sessions/client', sessionsCLientRoutes);

routes.use('/tokens/admin', TokensAdminRoutes);
routes.use('/tokens/client', TokensClientRoutes);

export default routes;
