import { container } from 'tsyringe';

import AdminRepository from '@modules/admin/infra/typeorm/repositories/AdminRepository';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

import ClientRepository from '@modules/client/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/client/repositories/IClientRepository';

import AdminTokensRepository from '@modules/admin/infra/typeorm/repositories/AdminTokensRepository';
import IAdminTokensRepository from '@modules/admin/repositories/IAdminTokensRepository';

import ClientTokensRepository from '@modules/client/infra/typeorm/repositories/ClientTokensRepository';
import IClientTokensRepository from '@modules/client/repositories/IClientTokensRepository';

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);

container.registerSingleton<IAdminRepository>(
  'AdminRepository',
  AdminRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IAdminTokensRepository>(
  'AdminTokensRepository',
  AdminTokensRepository,
);

container.registerSingleton<IClientTokensRepository>(
  'ClientTokensRepository',
  ClientTokensRepository,
);
