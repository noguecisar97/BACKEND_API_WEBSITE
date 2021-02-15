import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

interface IUpdPass {
  id: string;
  password: string;
}
interface IUpdName {
  id: string;
  nome: string;
}
interface IFind {
  nome: string;
  email: string;
}

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  updatePassword({ id, password }: IUpdPass): Promise<Client | undefined>;
  delete(id: string): Promise<void>;
  find({ nome, email }: IFind): Promise<Client[] | undefined>;
  save(data: Client): Promise<void>;
  updateName({ id, nome }: IUpdName): Promise<Client | undefined>;
}
